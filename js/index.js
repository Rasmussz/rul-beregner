// Vagttype-side: brugeren vælger en vagttype (specifikt klokkeslæt) og sendes videre.
const state = loadState();

if (!state.mode) {
  window.location.href = "index.html";
}

// Nulstil nedstrøms valg, hvis brugeren er kommet tilbage hertil.
clearKeys(["category", "shiftTime", "blockSize", "startPosition"]);

const columnsEl = document.getElementById("shift-columns");

SHIFT_CATEGORIES.forEach((category) => {
  const column = document.createElement("div");
  column.className = "shift-column";

  const categoryLabel = document.createElement("div");
  categoryLabel.className = "shift-category";
  categoryLabel.textContent = category.name;
  column.appendChild(categoryLabel);

  category.times.forEach((time) => {
    const timeBtn = document.createElement("div");
    timeBtn.className = "shift-time";
    timeBtn.textContent = time;
    timeBtn.addEventListener("click", () => {
      saveState({ category: category.name, shiftTime: time });
      window.location.href = state.mode === "fremskudt" ? "blocksize.html" : "position.html";
    });
    column.appendChild(timeBtn);
  });

  columnsEl.appendChild(column);
});
