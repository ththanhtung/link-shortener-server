import mongoose from 'mongoose';

const COLLECTION_NAME = 'URLs';
const DOCUMENT_NAME = 'URL';

interface URLAttrs {
  url_full_link: string;
  url_shorten_link: string;
}

interface URLDocs extends mongoose.Document {
  url_full_link: string;
  url_shorten_link: string;
}

interface URLModel extends mongoose.Model<URLDocs> {
  build(attrs: URLAttrs): URLDocs;
}

const URLSchema = new mongoose.Schema(
  {
    url_full_link: {
      type: String,
      required: true,
    },
    url_shorten_link: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  }
);

URLSchema.statics.build = (attrs: URLAttrs) => {
  return new URL(attrs);
};

const URL = mongoose.model<URLDocs, URLModel>(DOCUMENT_NAME, URLSchema);

export { URL };
