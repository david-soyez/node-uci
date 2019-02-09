
//browserify browser0.js -r ./browser_modules/readline.js:readline -r ./browser_modules/ChessLite.js:Chess -o bundle.js


const split2 = require('split2');
const stream = require('stream');

const readable = new stream.Readable({
    read(size) {
    }
});


const writable = new stream.Writable({
    write: function(chunk, encoding, next) {
        this.emit('data',chunk.toString('utf8'));
        next();
    }
});

process.stdin = readable;
process.stdout = writable;

var Engine = require('Engine');
var engine = new Engine();

//process.stdin.push("uci\n");

// make the engine process available to the browser
window.engine = {
    "process": process
};