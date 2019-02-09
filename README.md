# node-uci
Build and run chess UCI engines written in NodeJs

## Install
```
npm install
```

## Run 
```
node index.js example/engine.js
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