export function equalTemperament(start, end) {
  let noteNames = [
    "e",
    "f",
    "f#",
    "g",
    "g#",
    "a",
    "a#",
    "b",
    "c",
    "c#",
    "d",
    "d#"
  ];
  let notes = [];
  let curFreq = start;

  while (curFreq < end) {
    for (let i = 0; i < noteNames.length; i++) {
      if (noteNames[i] !== undefined) {
        notes.push({
          noteName: noteNames[i],
          hertz: curFreq,
          low: curFreq - 10,
          high: curFreq + 10
        });
        curFreq = curFreq * 1.05946;
      } else i = 0;
    }
  }
  return notes;
}
