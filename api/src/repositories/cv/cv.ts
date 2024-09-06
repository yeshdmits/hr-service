import { components } from "../../generated/api"
import { Collection, Document, WithId, ObjectId } from 'mongodb'
import { Repository } from "../default/repository"
import { InternalError } from "../../services/errors"

type cvType = components['schemas']['Cv']

export class CvRepository extends Repository<cvType> {
    constructor(col: Collection) {
        super(col)
    }

    public async findOneB64(id: string): Promise<string> {
        return await this.collection.findOne({ _id: new ObjectId(id) })
            .then(res => res?.b64 as string)
            .catch(err => {
                throw new InternalError(err.message)
            })
    }

    public async findOneFileId(id: string): Promise<string> {
        return await this.collection.findOne({ _id: new ObjectId(id) })
            .then(res => res?.id as string)
            .catch(err => {
                throw new InternalError(err.message)
            })
    }

    public async findManyFileId(idList: string[]): Promise<any[]> {
        return await this.collection.find({ _id: { $in: idList.map(i => new ObjectId(i))} }).toArray()
            .then(res => res.map(i => {
                return {
                    fileId: i?.id as string,
                    cv: this.object(i)
                }
            }))
            .catch(err => {
                throw new InternalError(err.message)
            })
    }

    public async insertOneB64(obj: cvType, b64: string): Promise<cvType> {
        return this.object(await this.collection.insertOne({ ...this.json(obj), b64 })
            .then(res => this.collection.findOne({ _id: res.insertedId }))
            .catch(err => {
                throw new InternalError(err.message)
            }))
    }

    protected object(doc: WithId<Document> | null): cvType {
        if (!doc) {
            throw new InternalError("No object exists in database")
        }
        return {
            id: doc._id.toString(),
            name: doc?.name as string,
            email: doc?.email as string,
            phone: doc?.phone as string,
            education: doc?.education as Array<string>,
            experience: doc?.experience as Array<string>,
            skills: doc?.skills as Array<string>,
            match: doc?.match as string,
        }
    }

    protected json(cv: cvType | undefined): any {
        return {
            id: cv?.id,
            name: cv?.name,
            email: cv?.email,
            phone: cv?.phone,
            education: cv?.education,
            experience: cv?.experience,
            skills: cv?.skills,
            match: cv?.match,
        }
    }
}