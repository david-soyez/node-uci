#! /bin/sh
node ../node_modules/browserify/bin/cmd.js browser.js -r ./browser_modules/readline.js:readline -r ./browser_modules/Board.js:Board --standalone require -r $1:Engine