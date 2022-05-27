const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const game = new Game(ctx);

document.querySelector("button").addEventListener("click", function (e) {
  if (game.interval) {
    game.stop();
    this.innerText = "START";
  } else {
    game.start();
    this.innerText = "STOP";
  }
});