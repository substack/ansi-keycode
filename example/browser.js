var decode = require('../');
var shoe = require('shoe');
var sock = shoe('/sock');

window.addEventListener('keydown', function (ev) {
    var c = decode(ev);
    if (c) sock.write(c);
});
