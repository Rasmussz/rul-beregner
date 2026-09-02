// Side: viser valgt vagttype (og evt. blokstørrelse) og lader brugeren angive sin startposition.
const state = loadState();

if (!state.mode || !state.shiftTime || (state.mode === "fremskudt" && !state.blockSize)) {
  window.location.href = state.mode ? "vagttype.html" : "index.html";
}

clearKeys(["startPosition"]);

const labelEl = document.getElementById("chosen-shift-label");
labelEl.textContent = "Valgte vagttype er " + state.shiftTime;
if (state.mode === "fremskudt") {
  labelEl.textContent += " (" + state.blockSize + " min blokke)";
}

document.getElementById("back-link").href =
  state.mode === "fremskudt" ? "blocksize.html" : "vagttype.html";

const positionList = state.mode === "fremskudt" ? FB_POSITIONS : SPOR_POSITIONS;

const select = document.getElementById("position-select");
positionList.forEach((pos) => {
  const opt = document.createElement("option");
  opt.value = pos;
  opt.textContent = pos;
  select.appendChild(opt);
});

const createBtn = document.getElementById("create-btn");

select.addEventListener("change", () => {
  createBtn.disabled = !select.value;
});

createBtn.addEventListener("click", () => {
  if (!select.value) return;
  saveState({ startPosition: select.value });
  window.location.href = "oversigt.html";
});
