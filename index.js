const fs = require('fs');
const path = require('path');

const {NodeVM,VMScript} = require('vm2');

const Board = require('@chesscode/board');


var engineFilename = process.argv[2];
var enginePath = path.dirname(engineFilename);

var codeJs = fs.readFileSync(engineFilename);

var readline = require('readline');

// overwrite readline write
readline.Interface.prototype.write = function(d, key) {
  if (this.paused) this.resume();
  this.output.write(d);
};

// needed to signal that process is started correctly
process.stdout.write("RunEngine 1.0\n");

const vm1 = new NodeVM({
    sandbox: {
        process: {
            stdin: process.stdin,
            stdout: process.stdout,
            on: process.on,
            exit: process.exit,
            nextTick: process.nextTick
        }
    },
    console: 'inherit',
    wrapper: 'none',
    require: {
        context: 'sandbox',
        external: true,
        root: enginePath,
        builtin: ['readline'],
        mock: {
            Board: Board,
            readline:readline 
        }
    }
});

// catch async errors
process.on('uncaughtException', (err) => {
    process.stderr.write(err.stack);
});


/*
try {
    var script = new VMScript(codeJs, 'index.js').compile();
} catch (err) {
    process.stderr.write(err.stack);
}
*/

// catch sync errors
try {
    const fn = vm1.run(codeJs, engineFilename);
    //fn.engine();
} catch (err) {
    process.stderr.write(err.stack);
}
