import { Job } from "../generated/models";
import { RestService } from "./RestService";

export class JobService extends RestService {
  public async getJobList(): Promise<Job[]> {
    const response = await this.jobApi.getJobList();
    return response;
  }

  public async createJob(job: Job): Promise<Job> {
    const response = await this.jobApi.createJob({job});
    return response;
  }

  public async getJobById(jobId: string): Promise<Job> {
    const response = await this.jobApi.getJobById({jobId})
    return response;
  }

  public async removeJob(jobId: string): Promise<void> {
    await this.jobApi.deleteJobById({jobId})
  }
}
