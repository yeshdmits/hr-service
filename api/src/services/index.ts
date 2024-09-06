import { CvService } from "./cv/cv"
import { JobService } from "./job/job"
import { MatchingService } from "./matching/matching"

export const cvService = new CvService()
export const jobService = new JobService()
export const matchingService = new MatchingService(cvService, jobService)
