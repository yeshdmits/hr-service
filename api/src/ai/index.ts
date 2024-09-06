import OpenAI from "openai"
import { randomUUID } from "crypto"
import { components } from '../generated/api'
import { TextContentBlock } from "openai/resources/beta/threads/messages.mjs"
import { AIError, RequestError } from "../services/errors"
const useMock = process.env.USE_MOCK || false

const openai = useMock ? null : new OpenAI({
    organization: process.env.ORGANIZATION_ID || '',
})

const vectoreStoreId = process.env.VECTOR_STORE_ID || ''
const assistantId = process.env.ASSISTANT_ID || ''

export async function proceedCVData(base64: string): Promise<components['schemas']['Cv']> {
    if (useMock || !openai) {
        return parseResponse(mockCvData)
    }
    let fake;
    try {
        fake = new File([Buffer.from(base64, 'base64')], `${randomUUID()}.pdf`, { type: "application/pdf" })
    } catch (err: any) {
        console.error(err.message)
        throw new RequestError(`Error while reading file: ${err.message}`)
    }
    let uploaded
    try {
        uploaded = await openai.files.create({
            file: fake,
            purpose: 'fine-tune'
        })
        console.log('Successfully uploaded file into bot, file_id: ' + uploaded.id)
    } catch (err: any) {
        console.error(err.message)
        throw new RequestError(`Error while uploading file: ${err.message}`)
    }
    try {
        await openai.beta.vectorStores.files.createAndPoll(vectoreStoreId, { file_id: uploaded.id })
        console.log('Added file into vector store')
    } catch (err: any) {
        console.error(err.message)
        throw new RequestError(`Error while pulling into vector file: ${err.message}`)
    }

    let thread;
    try {
        thread = await openai.beta.threads.create({
            messages: [{
                role: 'user',
                content: `Return one object with given file id: ${uploaded.id}. You need to answer only in JSON format! Retrieve Data from attachments of this message in json: {id: 'is uploaded file id',name: 'string',email: 'string',phone: 'string',education: ['string'],experience: ['string'],skills: ['string'],match: 0}`,
                attachments: [{ file_id: uploaded.id, tools: [{ type: 'file_search' }] }]
            }]
        })
        console.log('Created thread with the given prompt, thread_id: ' + thread.id)
    } catch (err: any) {
        console.error(err.message)
        throw new RequestError(`Error while creating thread: ${err.message}`)
    }
    let run;
    try {
        run = await openai.beta.threads.runs.createAndPoll(thread.id, { assistant_id: assistantId })
        console.log('Created run with the given thread, run status : ' + run.status)
    } catch (err: any) {
        console.error(err.message)
        throw new AIError(`Create run failed: ${err.message}`)
    }
    if (run.status === 'completed') {
        try {
            const messages = await openai.beta.threads.messages.list(thread.id, {
                run_id: run.id
            })
            if (messages?.data[0]?.content[0]?.type === 'text') {
                const text: TextContentBlock = messages.data[0]?.content[0]
                console.log(`Result : ${text.text.value}`)
                return parseResponse(text.text.value)
            }
        } catch (err: any) {
            console.error(err.message)
            throw new AIError(`Get message list failed: ${err.message}`)
        }

    }
    throw new AIError('Error while calling openai API')
}

export async function deleteCVData(id: string): Promise<boolean> {
    if (useMock || !openai) {
        return true
    }
    try {
        const deleted = await openai.files.del(id)
        if (deleted.deleted) {
            await openai.beta.vectorStores.files.del(vectoreStoreId, id)
            return true
        }
        return false
    } catch (err: any) {
        console.error(err.message)
        throw new AIError(`Delete file failed: ${err.message}`)
    }

}

export async function matchCvsToJob(fileIdList: string[], job: string): Promise<components['schemas']['matchCvsToJob_response']> {
    if (useMock || !openai) {
        return parseResponse(mockMatchingData)
    }
    let thread;
    try {
        thread = await openai.beta.threads.create({
            messages: [{
                role: 'user',
                content: `Analyse given files with ids: ${fileIdList.join(',')} to given description: ${job}. You need to answer only in JSON format! topMatches arrays should have size: ${fileIdList.length - 1}! Match given files to job description and return me json: { "bestMatch": { "id": "string", "name": "string", "email": "string", "phone": "string", "education": [ "string" ], "experience": [ "string" ], "skills": [ "string" ], match: 'from 1 to 100 string' }, "topMatches": [ { "id": "string", "name": "string", "email": "string", "phone": "string", "education": [ "string" ], "experience": [ "string" ], "skills": [ "string" ], match: 'from 1 to 100 string' } ] }`,
                attachments: fileIdList.map(i => {
                    return {
                        file_id: i,
                        tools: [{ type: 'file_search' }]
                    }
                })
            }]
        })
        console.log('Created thread with the given prompt, thread_id: ' + thread.id)
    } catch (err: any) {
        console.error(err.message)
        throw new AIError(`Create thread failed: ${err.message}`)
    }
    let run;
    try {
        run = await openai.beta.threads.runs.createAndPoll(thread.id, { assistant_id: assistantId })
        console.log('Created run with the given thread, run status : ' + run.status)
    } catch (err: any) {
        console.error(err.message)
        throw new AIError(`Create run failed: ${err.message}`)
    }
    if (run.status === 'completed') {
        try {
            const messages = await openai.beta.threads.messages.list(thread.id, {
                run_id: run.id
            })
            if (messages?.data[0]?.content[0]?.type === 'text') {
                const text: TextContentBlock = messages.data[0]?.content[0]
                console.log(`Result : ${text.text.value}`)
                return parseResponse(text.text.value)
            }
        } catch (err: any) {
            console.error(err.message)
            throw new AIError(`Get message list failed: ${err.message}`)
        }

    }
    throw new AIError('Error while calling openai API')
}

function parseResponse(jsonString: string): any {
    const regex = /```json([\s\S]*?)```/;
    const match = jsonString.match(regex);
    const cleanedString = match ? match[0].trim() : "{}"
    try {
        const jsonObject = JSON.parse(cleanedString
            .replace(/```json\n/, '')
            .replace(/```$/, '')
            .trim());
        return jsonObject;
    } catch (error: any) {
        throw new AIError(`Invalid JSON format: ${error.message}`)
    }
}

const mockCvData = "```json\n{\n\"id\":\"file-txQMc62z0vIWTHR0I54uYCbO\",\n\"name\":\"NameFirst\",\n\"email\":\"email@gmail.com\",\n\"phone\":\"+00 00 000 0000\",\n\"education\":[],\n\"experience\":[\n\"Java Backend Engineer\",\n\"Java Backend Engineer\",\n\"Java FullStack Developer\",\n\"Java Backend Developer\"\n],\n\"skills\":[\n\"Java SE and Java EE\",\n\"Spring Framework (Spring Boot, Spring Security, Spring MVC)\",\n\"Microservices-based architectures\",\n\"RESTful web services and APIs\",\n\"Hibernate, Apache, Micronaut\",\n\"JUnit, WireMock, Mockito\",\n\"Relational databases (MySQL, PostgreSQL, Oracle)\",\n\"NoSQL (MongoDB)\",\n\"JavaScript, HTML, CSS\",\n\"React, Angular\",\n\"CI/CD pipelines (Jenkins, GitLab CI/CD)\",\n\"Git\",\n\"Docker, Kubernetes\",\n\"Cloud platforms (AWS, Azure, GCP)\",\n\"Secure coding practices\",\n\"DevOps tools (Prometheus, Grafana)\"\n],\n\"match\": 0\n}\n```"
const mockMatchingData = "```json\n{\n\"bestMatch\": {\n\"id\":\"file-txQMc62z0vIWTHR0I54uYCbO\",\n\"name\":\"\",\n\"email\":\"\",\n\"phone\":\"\",\n\"education\":[],\n\"experience\":[],\n\"skills\":[],\n\"match\": \"90\"\n},\n\"topMatches\": [{\n\"id\":\"file-txQMc62z0vIWTHR0I54uYCbO\",\n\"name\":\"\",\n\"email\":\"\",\n\"phone\":\"\",\n\"education\":[],\n\"experience\":[],\n\"skills\":[],\n\"match\": \"90\"\n}\n]\n}\n```"
