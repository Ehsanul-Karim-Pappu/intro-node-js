const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

/**
 * this function is blocking, fix that
 * @param {String} name full file name of asset in asset folder
 */
const findAsset = (name) => {
  const assetPath = path.join(__dirname, 'assets', name)
  return fs.readFileSync(assetPath, {encoding: 'utf-8'}).toString()
}

const hostname = '127.0.0.1'
const port = 3000




function censor(censor) {
  var i = 0;

  return function(key, value) {
    if(i !== 0 && typeof(censor) === 'object' && typeof(value) == 'object' && censor == value) 
      return '[Circular]'; 

    if(i >= 29) // seems to be a harded maximum of 30 serialized objects?
      return '[Unknown]';

    ++i; // so we know we aren't using the original object anymore

    return value;  
  }
}




// log incoming request coming into the server. Helpful for debugging and tracking
const logRequest = (method, route, status) => console.log(method, route, status)

const server = http.createServer((req, res) => {
  fs.writeFileSync(path.join(__dirname, 'assets', 't.json'), JSON.stringify(req, censor(req)))
  console.log(typeof(req))
  const method = req.method
  const route = url.parse(req.url).pathname
  console.log('responding to request for the path '+ route)
  // this is sloppy, especially with more assets, create a "router"
  if (route === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'})
    res.write(findAsset('index.html'))
    logRequest(method, route, 200)
    res.end()
  } else if (route === '/style.css') {
    res.writeHead(200, {'Content-Type': 'text/css'})
    res.write(findAsset('style.css'))
    logRequest(method, route, 200)
    res.end()
  } else if (route === '/t.json') {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.write(findAsset('t.json'))
    
    //res.writeHead(200, {'Content-type':'text/html'})
    // res.write(JSON.stringify(req, censor(req)))
    logRequest(method, route, 200)
    res.end()
  } else {
    // missing asset should not cause server crash
    // throw new Error('route not found')
    res.writeHead(404, {'Content-Type': 'text/html'})
    // res.write("<h1>File not found</h1>")
    logRequest(method, route, 404)
    res.end()
  }
  // most important part, send down the asset
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
