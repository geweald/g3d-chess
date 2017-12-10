import Game from "./game";
import * as io from "./api";

const $menu = document.getElementById("menu");
const $menuText = document.getElementById("menu-text");
const $menuLoader = document.getElementById("menu-loader");
const $btnStart = document.getElementById("start-button");
const $remotePlayer = document.getElementById("remote-player");
const $localPlayer = document.getElementById("local-player");
const $remoteCircle = document.getElementById("remote-circle");
const $localCircle = document.getElementById("local-circle");

const game = Game(document.getElementById("game"));

game.onGameOver(isWinner => {
  $menu.style.display = "flex";
  $menuLoader.style.visibility = "hidden";
  $menuText.style.opacity = 1;
  $menuText.innerHTML = [
    '<span style="color: ',
    isWinner ? "rgb(21, 255, 0)" : "#b82b2b",
    '; font-size: 50px;">',
    isWinner ? "VICTORY" : "DEFEAT",
    "</span><br />Play again!"
  ].join("");
  $btnStart.style.opacity = 1;
});

game.onLocalMove(() => {
  $localPlayer.style.opacity = 0.3;
  $remotePlayer.style.opacity = 1;
});

io.onOponentMoved(() => {
  $localPlayer.style.opacity = 1;
  $remotePlayer.style.opacity = 0.3;
});

io.onWaitingForOponent(() => {
  $menuText.innerHTML = "Waiting for your oponent...";
  $menuText.style.opacity = 1;
  $menuLoader.style.visibility = "visible";
});

io.onStart(isWhite => {
  $menu.style.display = "none";
  $localPlayer.style.opacity = isWhite ? 1 : 0.3;
  $remotePlayer.style.opacity = !isWhite ? 1 : 0.3;
  $localCircle.style.background = isWhite ? "white" : "brown";
  $remoteCircle.style.background = !isWhite ? "white" : "brown";
});

io.onOponentLeft(() => {
  if (game.started) {
    $menu.style.display = "flex";
    $menuLoader.style.visibility = "hidden";
    $menuText.style.opacity = 1;
    $btnStart.style.opacity = 1;
    $menuText.innerHTML = [
      '<span style="color: rgb(21, 255, 0); font-size: 50px;">',
      "Your oponent has left the game :(",
      "</span><br />Play again!"
    ].join("");
  }
});

$btnStart.addEventListener("click", () => {
  $btnStart.style.opacity = 0;
  $menuText.style.opacity = 0;
  io.emitReady();
});
