import { components, operations } from '../../generated/api'
import { cvRepository } from '../../repositories'
import { proceedCVData, deleteCVData } from '../../ai'
import { AIError, InternalError } from '../errors'

type uploadCVResponse = operations['uploadCv']['responses'][200]['content']['application/json']
type getCvListResponse = operations['getCvList']['responses'][200]['content']['application/json']
type getCvByIdResponse = operations['getCvById']['responses'][200]['content']['application/json']
type deleteCvByIdResponse = operations['deleteCvById']['responses'][200]['content']

export class CvService {
    public async uploadCv(base64: string): Promise<uploadCVResponse> {
        const cv: components['schemas']['Cv'] = await proceedCVData(base64)
        console.log('Saving a new cv object: ' + JSON.stringify(cv))
        return await cvRepository.insertOneB64(cv, base64)
    }
    public async getCvList(): Promise<getCvListResponse> {
        return await cvRepository.findMany()
    }
    public async getCvById(cvId: string): Promise<getCvByIdResponse> {
        return { b64: await cvRepository.findOneB64(cvId) }
    }
    public async getFileIdListByCvIdList(cvIdList: string[]): Promise<any[]> {
        return await cvRepository.findManyFileId(cvIdList)
    }
    public async deleteCvById(id: string): Promise<deleteCvByIdResponse> {
        const fileId = await cvRepository.findOneFileId(id)
        const response = await deleteCVData(fileId)
        if (!response) {
            throw new AIError(`Failed to remove file, id: ${id}`)
        }
        const result = await cvRepository.deleteOne(id)
        if (result) {
            return
        }
        throw new InternalError(`Failed to remove file, id: ${id}`)
    }
}
