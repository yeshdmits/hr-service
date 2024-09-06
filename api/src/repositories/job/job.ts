import { components } from "../../generated/api"
import { Collection, Document, WithId } from 'mongodb'
import { Repository } from "../default/repository"
import { InternalError } from "../../services/errors"

type jobType = components['schemas']['Job']

export class JobRepository extends Repository<jobType> {
    constructor(collection: Collection) {
        super(collection)
    }

    protected object(doc: WithId<Document> | null): jobType {
        if (!doc) {
            throw new InternalError("No object exists in database")
        }
        return {
            id: doc._id.toString(),
            title: doc?.title as string,
            description: doc?.description as string,
        }
    }

    protected json(cv: jobType | undefined): any {
        return {
            id: cv?.id,
            title: cv?.title,
            description: cv?.description,
        }
    }
}