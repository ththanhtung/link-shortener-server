import { BadRequestError } from "../errors/badReqError"

interface INewShortenLinkReq{
    fullLink: string
}
 
export class URLServices {
    static async createNewShortenLink(req: INewShortenLinkReq){
        
    }
}