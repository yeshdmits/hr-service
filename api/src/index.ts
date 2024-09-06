import express from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import path from 'path'
import cors from 'cors'
import bodyParser from 'body-parser'
import { cvService, jobService, matchingService } from './services'
import { errorHandler, RequestError } from './services/errors'

const staticPath = path.join(__dirname, 'public')

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.raw({ type: 'application/pdf', limit: '20mb' }))
app.use(express.static(staticPath))
/* Swagger-UI */
const swaggerDocument = YAML.load(path.join(__dirname, '../../hr-service.yaml'))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/dashboard', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
/* uploadCv */
app.post('/v1/cv/upload', async (req, res) => {
    try {
        if (!req.body || req.body.length === 0) {
            throw new RequestError('No request body provided')
        }
        console.log('Trying to save a new uploaded file')
        const response = await cvService.uploadCv(req.body.toString('base64'))
        console.log('Saved a new CV: ' + JSON.stringify(response))
        res.status(200).json(response)
    } catch (error: any) {
        errorHandler(error, res)
    }
})
/* getCvList */
app.get('/v1/cv', async (req, res) => {
    try {
        console.log('Trying to retrieve list of cv')
        const response = await cvService.getCvList()
        console.log(`Retrieved list of cv, size: ${response.length}`)
        res.status(200).json(response)
    } catch (error: any) {
        errorHandler(error, res)
    }
})
/* getCvById */
app.get('/v1/cv/:cvId', async (req, res) => {
    try {
        console.log(`Trying to retrieve content of CV: ${req.params.cvId}`)
        const response = await cvService.getCvById(req.params.cvId)
        console.log('Retrieved Content of CV : [Base64]')
        res.status(200).json(response)
    } catch (error: any) {
        errorHandler(error, res)
    }
})
/* deleteCvById */
app.delete('/v1/cv/:cvId', async (req, res) => {
    try {
        console.log(`Trying to delete cv with id: ${req.params.cvId}`)
        const cvId = req.params.cvId
        const response = await cvService.deleteCvById(cvId)
        console.log(`Deleted cv with id: ${req.params.cvId}`)
        res.status(200).json(response)
    } catch (error: any) {
        errorHandler(error, res)
    }
})
/* getJobList */
app.get('/v1/job', async (req, res) => {
    try {
        console.log('Trying to retrieve list of Job')
        const response = await jobService.getJobList()
        console.log(`Retrieved list of Job, size: ${response.length}`)
        res.status(200).json(response)
    } catch (error: any) {
        errorHandler(error, res)
    }
})
/* createJob */
app.post('/v1/job', async (req, res) => {
    try {
        if (!req.body || req.body.length === 0) {
            throw new RequestError('No request body provided')
        }
        console.log('Trying to create a new Job')
        const response = await jobService.createJob(req.body)
        console.log(`Saved a new Job: ${JSON.stringify(response)}`)
        res.status(200).json(response)
    } catch (error: any) {
        errorHandler(error, res)
    }
})
/* getJobById */
app.get('/v1/job/:jobId', async (req, res) => {
    try {
        console.log(`Trying to retrieve content of Job: ${req.params.jobId}`)
        const response = await jobService.getJobById(req.params.jobId)
        console.log(`Retrieved Content of Job: ${JSON.stringify(response)}`)
        res.status(200).json(response)
    } catch (error: any) {
        errorHandler(error, res)
    }
})
/* deleteJobById */
app.delete('/v1/job/:jobId', async (req, res) => {
    try {
        console.log(`Trying to delete Job: ${req.params.jobId}`)
        const response = await jobService.deleteJobById(req.params.jobId)
        console.log(`Deleted Job with id: ${req.params.jobId}`)
        res.status(200).json(response)
    } catch (error: any) {
        errorHandler(error, res)
    }
})
/* matchCvsToJob */
app.post('/v1/matching', async (req, res, next) => {
    try {
        if (!req.body || req.body.length === 0) {
            throw new RequestError('No request body provided')
        }
        console.log(`Trying to Match Cv to Job: ${JSON.stringify(req.body)}`)
        const response = await matchingService.matchCvsToJob(req.body)
        console.log(`Match Cv List to Job result: ${JSON.stringify(response)}`)
        return res.status(200).json(response)
    } catch (error: any) {
        errorHandler(error, res)
    }

})

const PORT = process.env.PORT || 8001
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    console.log(`Swagger UI available at http://localhost:${PORT}/docs`)
})
