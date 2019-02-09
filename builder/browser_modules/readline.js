const split2 = require('split2');

var util = require('util'),
        EventEmitter = require('events').EventEmitter;

var Readline = function(input,output) {
    var self = this;
    this.input = input;
    this.output = output;
    var split = this.input.pipe(split2());

    // read input stream line by line
    split.on('data', function (line) {
        self.emit('line',line);
    });

    // reroute writing to output
    this.write = function(data) {
        self.output.write(data);
    }
};

util.inherits(Readline, EventEmitter);

var readline = {
    createInterface: function(param) {
        return new Readline(param['input'],param['output']);
    }
};

module.exports= readline;
