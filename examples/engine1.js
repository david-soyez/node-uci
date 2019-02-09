// read the standard input when the process is executed.
const chunk = process.stdin.read();

// wait for the isready command.
process.stdin.on('readable', () => {
    const chunk = process.stdin.read();
    if (chunk !== null) {
        if(chunk.toString('utf8') ==="isready\n"){
            process.stdout.write("readyok\n");
        }
    }
});