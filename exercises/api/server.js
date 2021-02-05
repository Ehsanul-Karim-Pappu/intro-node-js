const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')
const { error } = require('console')
const { rejects } = require('assert')
const { resolve } = require('path')
const mime = require('mime')

/**
 * this function is blocking, fix that
 * @param {String} name full file name of asset in asset folder
 */
const findAsset = (name) => {
  const assetPath = path.join(__dirname, 'assets', name)
  return new Promise((resolve, rejects) => {
    fs.readFile(assetPath, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        rejects(err)
      }
      else {
        resolve(data)
      }
    })
  })
}

const hostname = '127.0.0.1'
const port = 3000
const router = {
  '/ GET': {
    asset: 'index.html',
    type: mime.getType('html')
  },
  '/style.css GET': {
    asset: 'style.css',
    type: mime.getType('css')
  }
}


// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) => console.log(method, route, status)

const server = http.createServer(async (req, res) => {
  const method = req.method
  const route = req.url
  const match = router[`${route} ${method}`]

  if (!match) {
    res.writeHead(404)
    logRequest(method, route, 404)
    return res.end()
  }

  res.writeHead(200, { 'Content-Type': match.type })
  res.write(await findAsset(match.asset))
  logRequest(method, route, 200)
  res.end()
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
