import { RestService } from "./RestService";
import { MatchCvsToJobRequest, MatchCvsToJobResponse } from "../generated/models";

export class MatchingService extends RestService {
  public async matchCvsToJob(
    matchCvsToJobRequest: MatchCvsToJobRequest
  ): Promise<MatchCvsToJobResponse> {
    const response = await this.matchingApi.matchCvsToJob({matchCvsToJobRequest})
    return response;
  }
}
