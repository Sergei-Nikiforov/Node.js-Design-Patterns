import { createReadStream, createWriteStream } from 'fs'
import { pipeline } from 'stream'
import { randomBytes } from 'crypto'
import { createCompressAndEncrypt, createDecryptAndDecompress } from './combined-streams.js'

const [,, password, source, iv] = process.argv
console.log(process.argv);
const destination = `${source}.json`

pipeline(
  createReadStream(source),
  createDecryptAndDecompress(password, Buffer.from(iv, 'hex')),
  createWriteStream(destination),
  (err) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`${destination} created with iv: ${iv.toString('hex')}`)
  }
)
