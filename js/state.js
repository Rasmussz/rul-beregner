// Simpel hjælper til at give data videre mellem siderne via localStorage.
const STORAGE_KEY = "cph-rul-state";

function saveState(partial) {
  const current = loadState();
  const next = Object.assign({}, current, partial);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

// Fjerner udvalgte nøgler fra state, uden at røre resten (fx når man går
// et skridt frem i flowet og nedstrøms valg derfor skal nulstilles).
function clearKeys(keys) {
  const current = loadState();
  keys.forEach((key) => delete current[key]);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}
