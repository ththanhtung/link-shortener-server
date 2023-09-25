import { nanoid } from "nanoid"
import { BadRequestError } from "../errors/badReqError"
import { URL } from "../models/url.model"
import { NotFoundError } from "../errors/notFoundError"

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

    static async redirectShortenLink(shortenLink: string){
        if (shortenLink === ''){
            throw new NotFoundError()
        }
        const link = await URL.findOne({
            url_shorten_link: shortenLink
        }).lean()

        if (!link){
            throw new NotFoundError()
        }

        return link.url_full_link
    }
}