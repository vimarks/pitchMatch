import * as Media from "./mediaManager.js";
import * as Play from "./play.js";

let ctx = new AudioContext();
window.onload = function() {
  let analyser = ctx.createAnalyser();
  analyser.fftSize = 2048;
  Media.getUserStream(callback);

  function callback(stream) {
    let osc = ctx.createOscillator();
    let mic = ctx.createMediaStreamSource(stream);
    mic.connect(analyser);
    osc.connect(ctx.destination);
    osc.start(0);

    Play.play(ctx, analyser, osc);
  }
};
