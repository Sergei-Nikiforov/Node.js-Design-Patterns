import { createUploadStream } from './createUploadStream.js';

const upload = createUploadStream('a-file.txt')
upload.write('Hello World')
upload.end()