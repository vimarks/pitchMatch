import * as Media from "./mediaManager.js";
import * as Play from "./play.js";

let startButton = document.getElementById("startButton");
startButton.addEventListener("click", start);

function start() {
  let ctx = new AudioContext();
  let analyser = ctx.createAnalyser();
  let osc = ctx.createOscillator();
  analyser.fftSize = 4096;
  Media.getUserStream(callback);

  function callback(stream) {
    let mic = ctx.createMediaStreamSource(stream);
    mic.connect(analyser);
    osc.connect(ctx.destination);
    osc.start(0);
    Play.play(ctx, analyser, osc);
  }
  let stopButton = document.getElementById("stopButton");
  stopButton.addEventListener("click", stop);

  function stop() {
    osc.stop(0);
  }
}
