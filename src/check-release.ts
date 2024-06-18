import fs from 'fs'
import path from 'path'

const dist = path.join(process.cwd(), 'lib')

  ; (async () => {
    if (fs.existsSync(dist)) {
      console.log('> Abort. Release at root is not allowed.\n')
      process.exit(1)
    }
  })()
