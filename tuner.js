import * as Media from "./mediaManager.js";
import * as Play from "./play.js";

let ctx = new AudioContext();
window.onload = function() {
  let analyser = ctx.createAnalyser();
  analyser.fftSize = 4096;
  Media.getUserStream(callback);

  function callback(stream) {
    let osc = ctx.createOscillator();
    let mic = ctx.createMediaStreamSource(stream);
    mic.connect(analyser);
    osc.connect(ctx.destination);
    osc.start(0);
    let data = new Uint8Array(analyser.frequencyBinCount);

    Play.play(ctx, analyser, osc, data);
  }
};
