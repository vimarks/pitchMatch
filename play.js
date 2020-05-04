import * as ET from "./equalTemperament.js";

export function play(ctx, analyser, osc) {
  let data = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(data);

  // get fullest bin
  let idx = 0;
  for (let j = 0; j < analyser.frequencyBinCount; j++) {
    if (data[j] > data[idx]) {
      idx = j;
    }
  }

  let frequency = (idx * ctx.sampleRate) / analyser.fftSize;
  let notes = ET.equalTemperament(41.2034, 6000);

  function getNote(frequency, notes) {
    if (notes.length > 0) {
      let mid = Math.floor((notes.length - 1) / 2);
      let target = notes[mid];

      if (frequency >= target.low && frequency <= target.high) {
        return [target.hertz, target.noteName];
      } else if (frequency < target.low) {
        return getNote(frequency, notes.slice(0, mid));
      } else if (frequency > target.high) {
        return getNote(frequency, notes.slice(mid + 1));
      }
    }
    return [];
  }

  let broadcast = getNote(frequency, notes);

  if (broadcast.length) {
    osc.frequency.value = broadcast[0];
  }

  requestAnimationFrame(function() {
    play(ctx, analyser, osc);
  });
}
