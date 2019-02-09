const readline = require('readline');

const MicroChess = require('./MicroChess.js');

let microchess = new MicroChess();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

process.stdout.write("Simple Engine\n");

let isready = true;
let notifyOnReady = false;

/**
 * Readline line event
 */
rl.on('line', function(line){
  if(line === "quit") {
    process.exit();
  } else if(line === "isready" ) {
    // answer right away if the engine is ready, otherwise postpone the answer.
    if(isready) {
      process.stdout.write("readyok\n");
    } else {
      notifyOnReady = true;
    }
  }
  else if(isready) {
    runCommand(line);
  }
});

/**
 * runCommand.
 */
async function runCommand(cmd) {
  if(cmd === "uci") {
    uci();
  }
  else if(cmd === "d" || cmd === "display") {
    display();
  }
  else if(cmd === "ucinewgame") {
    ucinewgame();
  }
  else if(cmd.split(" ").indexOf("position") === 0) {
    position(cmd);
  }
  else if(cmd.split(" ").indexOf("go") === 0) {
    go(cmd);
  }
  else if(cmd == "fen") {
    fen();
  }
  else if(cmd.split(" ").indexOf("busy") >= 0) {
    let sec = cmd.split(" ").length == 2 ? cmd.split(" ")[1] : 1;
    isready = false;
    await busy(sec*1000);
    isready = true;
  }
  else{
    process.stdout.write("unknown command\n");
  }

  // give a last chance to receive a isready
  process.nextTick(function() {
    if(notifyOnReady && isready) {
      notifyOnReady = false;
      process.stdout.write("readyok\n");
    }
  });
}

/**
 * The uci command.
 */
function uci() {
  process.stdout.write("id name Simple Engine v1.1\n");
  process.stdout.write("id author David Soyez\n");
  process.stdout.write("uciok\n");
}

/**
 * Display
 */
function display() {
  process.stdout.write(microchess.board.getCurrentState().display());
}

/**
 * The ucinewgame command.
 */
function ucinewgame() {
  microchess.newGame();
}

/**
 * Position command
 */
function position(cmd) {
  let tokens = cmd.split(/\s+/);
  if(tokens[1] === "startpos") {
    microchess.newGame();
    if(tokens.length >= 3 && tokens[2] === "moves") {
      move(tokens.slice(3));
    }
  } else if(tokens[1] === "fen" && tokens.length >= 5){
    microchess.load(tokens[2]+" "+tokens[3]+" "+tokens[4]);
    if(tokens.length >= 6 && tokens[5] === "moves") {
      move(tokens.slice(6));
    }
  }

  function move(moves) {
    for(let i = 0;i <= moves.length-1; i++) {
      let move = moves[i].split("");
      if(move.length != 4) continue;
      let fromX = "abcde".indexOf(move[0]);
      let fromY = 5 - move[1] ;
      let toX = "abcde".indexOf(move[2]);
      let toY = 5 - move[3] ;
      microchess.board.move(fromX, fromY, toX, toY);
    }
  }
}

/**
 * Go command
 */
function go(cmd) {
  let move = microchess.generateMove();
  if(move) {
    process.stdout.write("bestmove "+microchess.toAlgebraic(move)+"\n");
  }
}

/**
 * The busy command.
 * Get busy doing nothing for 4 seconds.
 */
function busy(ms) {
  return new Promise(resolve => {
    setTimeout(function() {
      resolve();
    },ms);
  });
}

function fen() {
  let fen = microchess.toFen();
  process.stdout.write(fen+"\n");
}

//position("position fen rn1qk/p1b1p/1p2p/5/1PPP1/KQBNR w 5");
//go();