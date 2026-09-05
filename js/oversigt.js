// Side: bygger og viser rul-oversigten ud fra valgt vagttype, mode og startposition.
const state = loadState();
const wrapper = document.getElementById("table-wrapper");
const swapBtn = document.getElementById("swap-btn");

let swapped = false;

const missingSelection =
  !state.mode ||
  !state.shiftTime ||
  !state.startPosition ||
  (state.mode === "fremskudt" && !state.blockSize);

if (missingSelection) {
  wrapper.innerHTML =
    '<div class="error-box">Der mangler et eller flere valg. Gå tilbage og prøv igen.</div>';
  swapBtn.disabled = true;
  swapBtn.style.display = "none";
} else {
  // Spor er den eneste vagttype med et 1. Mand/Karm-par, så kun her giver ombyt-knappen mening.
  if (state.mode !== "spor") {
    swapBtn.style.display = "none";
  } else {
    swapBtn.addEventListener("click", () => {
      swapped = !swapped;
      renderTable();
    });
  }

  renderTable();
}

function renderTable() {
  const rows =
    state.mode === "fremskudt"
      ? buildFremskudtSchedule(state.shiftTime, state.startPosition, state.blockSize)
      : buildSchedule(state.shiftTime, state.startPosition, swapped);

  const table = document.createElement("table");
  table.className = "rul-table";

  const thead = document.createElement("thead");
  thead.innerHTML = "<tr><th>Tidspunkt</th><th>Position</th></tr>";
  table.appendChild(thead);

  const tbody = document.createElement("tbody");
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = "<td>" + row.time + "</td><td>" + row.position + "</td>";
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);

  wrapper.innerHTML = "";
  wrapper.appendChild(table);
}
