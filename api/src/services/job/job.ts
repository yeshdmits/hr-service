import { operations } from '../../generated/api'
import { jobRepository } from '../../repositories'
import { InternalError } from '../errors'

type getJobListResponse = operations['getJobList']['responses'][200]['content']['application/json']
type createJobResponse = operations['createJob']['responses'][200]['content']['application/json']
type createJobRequest = operations['createJob']['requestBody']['content']['application/json']
type getJobByIdResponse = operations['getJobById']['responses'][200]['content']['application/json']
type deleteJobByIdResponse = operations['deleteJobById']['responses'][200]['content']

export class JobService {
    public async getJobList(): Promise<getJobListResponse> {
        return await jobRepository.findMany()
    }
    public async createJob(body: createJobRequest): Promise<createJobResponse> {
        return await jobRepository.insertOne(body)
    }
    public async getJobById(id: string): Promise<getJobByIdResponse> {
        return jobRepository.findOne(id)
    }

    public async deleteJobById(id: string): Promise<deleteJobByIdResponse> {
        const result = await jobRepository.deleteOne(id)
        if (!result) {
            throw new InternalError(`Failed to remove job, id: ${id}`)
        }
    }
}
