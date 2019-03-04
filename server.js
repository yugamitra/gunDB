/* server.js */

// import the native http module
var http = require('http')

// import gun
var Gun = require("./node_modules/gun")

var server = http.createServer(function(req, res){
  if (Gun.serve(req, res)){ return } // filters gun requests!
  
  require('fs').createReadStream(require('path').join(__dirname, req.url)).on('error',function(){ // static files!
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end(
    require('fs')
      .readFileSync(require('path')
      .join(__dirname, 'index.html') // or default to index
    ));
  }).pipe(res); // stream
});

// start listening for requests on `localhost:8080`
server.listen(8080)