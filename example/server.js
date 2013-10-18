var http = require('http');
var shoe = require('shoe');
var ecstatic = require('ecstatic')(__dirname + '/static');

var server = http.createServer(ecstatic);
server.listen(8000);

var sock = shoe(function (stream) {
    stream.pipe(process.stdout);
});
sock.install(server, '/sock');
