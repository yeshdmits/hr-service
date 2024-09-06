import { Collection, Document, WithId, ObjectId } from 'mongodb'
import { InternalError } from '../../services/errors'

export abstract class Repository<T> {
    protected collection: Collection

    constructor(collection: Collection) {
        this.collection = collection
    }

    public async findOne(id: string): Promise<T> {
        return this.object(await this.collection.findOne({ _id: new ObjectId(id) })
        .catch(err => {
            throw new InternalError(err.message)
        }))
    }

    public async insertOne(obj: T): Promise<T> {
        return this.object(await this.collection.insertOne(this.json(obj))
            .then(res => this.collection.findOne({ _id: res.insertedId }))
            .catch(err => {
                throw new InternalError(err.message)
            }))
            
    }

    public async findMany(): Promise<Array<T>> {
        return await this.collection.find().toArray()
            .then(res => res.map(i => this.object(i)))
            .catch(err => {
                throw new InternalError(err.message)
            })
    }

    public async deleteOne(id: string): Promise<boolean> {
        return await this.collection.deleteOne({ _id: new ObjectId(id) })
            .then(res => res.acknowledged)
            .catch(err => {
                throw new InternalError(err.message)
            })
    }
    public async deleteMany(): Promise<boolean> {
        return await this.collection.deleteMany()
            .then(res => res.acknowledged)
            .catch(err => {
                throw new InternalError(err.message)
            })
    }

    protected abstract object(doc: WithId<Document> | null): T

    protected abstract json(cv: T | undefined): any
}