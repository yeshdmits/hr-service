import { MongoClient } from 'mongodb'
import { CvRepository } from './cv/cv'
import { JobRepository } from './job/job'

const uri = process.env.DB_URL || "mongodb://localhost:27017/test"

const client = new MongoClient(uri)

const database = client.db('hr-service-test-env')

export const cvRepository = new CvRepository(database.collection('hr-service-cvs'))
export const jobRepository = new JobRepository(database.collection('hr-service-jobs'))