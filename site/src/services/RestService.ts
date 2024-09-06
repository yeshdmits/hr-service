import { Configuration, CvApi, JobApi, MatchingApi } from "../generated";

const isDevEnv = import.meta.env.DEV;

export const baseUrl = isDevEnv
  ? 'http://localhost:8001'
  : '';

const config = new Configuration({basePath: baseUrl});

export class RestService {
  protected cvApi = new CvApi(config);
  protected jobApi = new JobApi(config);
  protected matchingApi = new MatchingApi(config);
}
