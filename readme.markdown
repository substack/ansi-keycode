# ansi-keycode

Turn browser keycodes into ansi characters and escape sequences.

# example

## simple repl example

```
$ node
> require('ansi-keycode')(97)
'a'
> require('ansi-keycode')(36) // HOME key
'\u001bOH'
> require('ansi-keycode')(220)
'\\'
```

## browser->server

the browser forwards its decoded events to the server:

``` js
var decode = require('ansi-keycode');
var shoe = require('shoe');
var sock = shoe('/sock');

window.addEventListener('keydown', function (ev) {
    var c = decode(ev);
    if (c) sock.write(c);
});
```

and the server.js will print what is typed in the browser:

``` js
var http = require('http');
var shoe = require('shoe');
var ecstatic = require('ecstatic')(__dirname + '/static');

var server = http.createServer(ecstatic);
server.listen(8000);

var sock = shoe(function (stream) {
    stream.pipe(process.stdout);
});
sock.install(server, '/sock');
```

# methods

``` js
var decode = require('ansi-keycode')
```

## decode(ev, opts)

Return the ansi string for `ev.which` or the keycode integer `ev`.

If `opts.arrows` is `false`, don't include escape sequences for arrow keys.

If `opts.delete` is `false`, don't include escape sequences for the delete key.

If `opts.backspace` is `false`, don't include escape sequences for the backspace
key.

# install

With [npm](https://npmjs.org) do:

```
npm install ansi-keycode
```

# license

MIT
