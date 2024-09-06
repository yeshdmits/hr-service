import { Cv } from "../generated/models";
import { RestService } from "./RestService";

export class CvService extends RestService {
  public async uploadCv(file: File): Promise<Cv> {
    const response = await this.cvApi.uploadCv({body: file});;
    return response;
  }

  public async getCvById(cvId: string): Promise<string> {
    const response = await this.cvApi.getCvById({cvId})
    if (!response.b64) {
      throw new Error("No content was fetched")
    }
    return response.b64;
  }

  public async getCvList(): Promise<Cv[]> {
    const response = await this.cvApi.getCvList()
    return response;
  }

  public async removeCv(cvId: string): Promise<void> {
    await this.cvApi.deleteCvById({cvId})
  }
}
