export function getUserStream(callback) {
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia;

  navigator.getUserMedia({ video: false, audio: true }, callback, console.log);
}
