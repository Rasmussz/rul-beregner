// Side: viser de faste natopgaver som er tilknyttet en nattevagt.
// Opgaverne kan afkrydses undervejs (kun visuelt, gemmes ikke mellem besøg).
const NIGHT_TASKS = [
  "Hente/fylde plastikposer",
  "Indsamle alkohol",
  "Indragne Øst",
  "Indragne Vest",
  "Hittegods",
  "Fylde handsker/futter",
  "Oprydning på Øst",
  "Oprydning på Vest",
  "Oprydning køkken",
  "Genstarte PC",
  "Screenerrum",
  "Tømme køleskabe",
  "Test af udstyr (CT Scanner, Samdex, Karm, Security Scanner, Cobalt)",
  "Hente handsker osv. fra fjernlageret",
  "Hente kasser til indcheck",
];

const gridEl = document.getElementById("task-grid");

NIGHT_TASKS.forEach((task, index) => {
  const item = document.createElement("label");
  item.className = "task-item";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.dataset.index = index;

  const text = document.createElement("span");
  text.className = "task-text";
  text.textContent = task;

  checkbox.addEventListener("change", () => {
    item.classList.toggle("checked", checkbox.checked);
  });

  item.appendChild(checkbox);
  item.appendChild(text);
  gridEl.appendChild(item);
});
