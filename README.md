# node-uci
Write UCI chess engines in NodeJs and run them inside a terminal or browser.

## Prerequisites
Node >= 8.0


## Install
Download or checkout the repo and run:

```
npm install
```

## Run 
```
node index.js example/index.js
```

## Build for browser usage
If you want to run your engine inside a browser.

```
cd builder/
./browser.sh ../example/Engine.js > ../example_browser/engine.js 
```

Then use this js commands in the browser:

```
window.engine.process.stdout.on('data',function(data) {
console.log(data);
});

window.engine.process.stdin.push("uci\n");
window.engine.process.stdin.push("isready\n");
window.engine.process.stdin.push("go\n");
```
