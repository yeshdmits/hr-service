import { operations } from '../../generated/api'
import { CvService } from '../cv/cv'
import { JobService } from '../job/job'
import { matchCvsToJob } from '../../ai'
import { AIError, RequestError } from '../errors'

type matchCvsToJobRequest = operations['matchCvsToJob']['requestBody']['content']['application/json']
type matchCvsToJobResponse = operations['matchCvsToJob']['responses'][200]['content']['application/json']

export class MatchingService {
    private cvService: CvService
    private jobService: JobService

    constructor(cvService: CvService, jobService: JobService) {
        this.cvService = cvService
        this.jobService = jobService
    }

    public async matchCvsToJob(body: matchCvsToJobRequest): Promise<matchCvsToJobResponse> {
        if (!body.jobId || !body.cvId || body.cvId.length === 0) {
            throw new RequestError('Could not find job or cv in the request body')

        }
        const job = await this.jobService.getJobById(body.jobId)
        if (!job.description) {
            throw new RequestError('Job does not contain description')
        }
        const fileIdList = await this.cvService.getFileIdListByCvIdList(body.cvId)
        const result = await matchCvsToJob(fileIdList.map(i => i.fileId), job.description)
        console.log(`Response : ${JSON.stringify(result)}`)
        return this.transformData(result, fileIdList)
    }

    private transformData(response: matchCvsToJobResponse, map: any[]): matchCvsToJobResponse {
        try {


            const result: matchCvsToJobResponse = {
                bestMatch: {},
                topMatches: []
            }
            if (response.bestMatch && response.bestMatch.match) {
                const bestMatch = response.bestMatch
                const fromDB = map.filter(i => i.fileId === bestMatch?.id)[0].cv
                fromDB.match = bestMatch?.match
                result.bestMatch = fromDB
            }

            if (!response.topMatches || response.topMatches.length === 0) {
                throw new AIError('Matching has failed result')
            }

            response.topMatches.forEach((item: any) => {
                const topMatch = item
                const fromDb = map.filter(i => i.fileId === topMatch.id)[0].cv
                fromDb.match = topMatch?.match
                result.topMatches?.push(fromDb)
            })

            return result
        } catch (err: any) {
            console.error(err.message)
            throw new AIError(`Error while parsing response: ${response}`)
        }
    }
}
