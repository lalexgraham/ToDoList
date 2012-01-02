//Load modules  
var http = require('http');  
var url = require('url');

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    route(handle, pathname, response, request);
  }

  var port = process.env.PORT || 8888;
  http.createServer(onRequest).listen(port);
  console.log("Server has started on port " + port);
}

exports.start = start;