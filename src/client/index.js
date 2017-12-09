import ThreeScene from "./ThreeScene";
import Game from "./game";
import * as io from "./api";

io.onOponentJoined(() => console.log("Oponent joined"));
io.onOponentMoved(data => console.log("Move", data));
io.onStart(isMyTurn => {
  console.log("Start", isMyTurn);
  io.emitMove({ fromPoint: [0, 1], toPoint: [2, 2] });
});
io.onOponentLeft(() => console.log("Oponent left"));
io.emitReady();

const game = ThreeScene();
game.init(document.body);

Game();
