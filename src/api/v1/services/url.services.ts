import { nanoid } from 'nanoid';
import { BadRequestError } from '../errors/badReqError';
import { URL } from '../models/url.model';
import { NotFoundError } from '../errors/notFoundError';

interface INewShortenLinkReq {
  fullLink: string;
}
interface INewShortenLinkUpdateReq {
  shortenLink: string;
  fullLink: string;
}

export class URLServices {
  static async createNewShortenLink(req: INewShortenLinkReq) {
    const shortID = nanoid(8);
    const newShortenLink = await URL.build({
      url_full_link: req.fullLink,
      url_shorten_link: shortID,
    });

    newShortenLink.save();

    return {
      metadata: {
        link: newShortenLink,
      },
    };
  }

  static async redirectShortenLink(shortenLink: string) {
    if (shortenLink === '') {
      throw new NotFoundError();
    }
    const link = await URL.findOne({
      url_shorten_link: shortenLink,
    }).lean();

    if (!link) {
      throw new NotFoundError();
    }

    return link.url_full_link;
  }

  static async getLinks() {
    const links = await URL.find({ url_is_active: true });
    return {
      metadata: {
        links,
      },
    };
  }
  static async updateLink(req: INewShortenLinkUpdateReq) {
    const newLink = await URL.findOneAndUpdate(
      { url_shorten_link: req.shortenLink },
      {
        $set: {
          url_full_link: req.fullLink,
        },
      },
      {
        new: true,
      }
    );
    return {
      metadata: {
        link: newLink,
      },
    };
  }
  static async deleteLink(shortenLink: string) {
    if (shortenLink === '') {
      throw new NotFoundError();
    }
    const deletedLink = await URL.findOneAndDelete({
      url_shorten_link: shortenLink,
    });
    return {
      metadata: {
        link: deletedLink,
      },
    };
  }
  static async deActiveLink(shortenLink: string) {
    if (shortenLink === '') {
      throw new NotFoundError();
    }
    const updatedLink = await URL.findOneAndUpdate(
      {
        url_shorten_link: shortenLink,
      },
      {
        $set: {
          url_is_active: false,
        },
      },
      {
        new: true,
      }
    );
    return {
      metadata: {
        link: updatedLink,
      },
    };
  }

  static async activeLink(shortenLink: string) {
    if (shortenLink === '') {
      throw new NotFoundError();
    }
    const updatedLink = await URL.findOneAndUpdate(
      {
        url_shorten_link: shortenLink,
      },
      {
        $set: {
          url_is_active: true,
        },
      },
      {
        new: true,
      }
    );
    return {
      metadata: {
        link: updatedLink,
      },
    };
  }
}
