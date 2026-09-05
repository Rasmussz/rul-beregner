// Kun for fremskudt boarding: vælg om rullet skal opdeles i 30 eller 45 min blokke.
const state = loadState();

if (state.mode !== "fremskudt" || !state.shiftTime) {
  window.location.href = state.mode ? "vagttype.html" : "index.html";
}

clearKeys(["blockSize", "startPosition"]);

document.getElementById("block-30-btn").addEventListener("click", () => {
  saveState({ blockSize: 30 });
  window.location.href = "position.html";
});

document.getElementById("block-45-btn").addEventListener("click", () => {
  saveState({ blockSize: 45 });
  window.location.href = "position.html";
});
