import { PassThrough } from 'stream';
import { upload } from './upload.js';

export function createUploadStream (filename) {
    const connector = new PassThrough();

    upload(filename, connector);
    return connector;
}
