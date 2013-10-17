module.exports = function (ev, opts) {
    if (!opts) opts = {};
    if (typeof ev === 'number') ev = { which: ev };
    
    var code = ev.which || ev.keyCode;
    var c = String.fromCharCode(code);
    
    if (ev.shiftKey && ev.ctrlKey) return;
    if (ev.ctrlKey && c === 'R') return; // pass ctrl-r through
    if (ev.ctrlKey && c === 'L') return; // pass ctrl-l through

    if (code < 32 && code !== 8 && !/\s/.test(c)) return;
    
    if (code >= 37 && code <= 40) {
        if (opts.arrows === false) return undefined;
        c = '\x1b[' + String.fromCharCode({
            38: 65, 40: 66, 39: 67, 37: 68
        }[code]);
        return c;
    }
    else if (code === 33) return '\x1b[5~'; // pgup
    else if (code === 34) return '\x1b[6~'; // pgdown
    else if (code === 35) return '\x1bOF'; // end
    else if (code === 36) return '\x1bOH'; // home
    else if (code === 45) return '\x1b[2~'; // insert
    else if (code === 46) return '\x1b[3~'; // delete
    
    if (/[A-Z]/.test(c) && ev.shiftKey === false) {
        c = c.toLowerCase();
    }
    else if (/\d/.test(c) && ev.shiftKey) {
        c = ')!@#$%^&*('.charAt(parseInt(c));
    }
    else {
        c = ({
            186: [ ';', ':' ],
            187: [ '=', '+' ],
            188: [ ',', '<' ],
            189: [ '-', '_' ],
            190: [ '.', '>' ],
            191: [ '/', '?' ],
            192: [ '`', '~' ],
            219: [ '[', '{' ],
            220: [ '\\', '|' ],
            221: [ ']','}' ],
            222: [ '\'', '"' ]
        }[code] || [ c, c ])[ev.shiftKey ? 1 : 0] || c;
    }
    
    if (/^[a-z]$/.test(c) && ev.ctrlKey) {
        code = code - 64;
        c = String.fromCharCode(code);
    }
    if (code === 7 && opts['delete'] === false) return undefined;
    if (code === 8 && opts.backspace === false) return undefined;
    if (code === 13) return '\r\n';
    return c;
};
