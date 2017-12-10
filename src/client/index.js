import Game from "./game";
import * as io from "./api";

Game(document.getElementById("game"));

io.emitReady();
