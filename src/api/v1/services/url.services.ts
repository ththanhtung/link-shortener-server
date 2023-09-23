import { nanoid } from "nanoid"
import { BadRequestError } from "../errors/badReqError"
import { URL } from "../models/url.model"

interface INewShortenLinkReq{
    fullLink: string
}
 
export class URLServices {
    static async createNewShortenLink(req: INewShortenLinkReq){
        const shortID = nanoid(8) 
        const newShortenLink = await URL.build({
            url_full_link: req.fullLink,
            url_shorten_link: shortID
        })

        newShortenLink.save()
        
        return{
            metadata: {
                link: newShortenLink
            }
        }
    }
}