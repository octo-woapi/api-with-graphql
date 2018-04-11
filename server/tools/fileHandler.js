const fs = require('fs')

function write (path) {
    return (stuffToWrite) => {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, JSON.stringify(stuffToWrite), (err) => {
                if (err) reject(err)
                resolve('done')
            })
        })
    }
}

class FileNotFoundError extends Error {
}

function read (path) {
  return () => {
    try {
      return JSON.parse(fs.readFileSync(path, 'utf8'))
    } catch (err) {
      if (err.code === 'ENOENT') {
        throw new FileNotFoundError('File not found: ')
      } else {
        throw err
      }
    }
  }
}

module.exports = (filePath) => {
  return {
    read: read(filePath),
    write: write(filePath),
    FileNotFoundError
  }
}
