// Forreste side: vælg mellem "Spor" og "Fremskudt boarding".
clearState();

document.getElementById("spor-btn").addEventListener("click", () => {
  saveState({ mode: "spor" });
  window.location.href = "vagttype.html";
});

document.getElementById("fremskudt-btn").addEventListener("click", () => {
  saveState({ mode: "fremskudt" });
  window.location.href = "vagttype.html";
});
