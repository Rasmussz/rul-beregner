// Al forretningslogik for hvordan rul-oversigten (rotationen) beregnes.

const SLOT_MINUTES = 30;
// Rotationsrækkefølgen for spor er altid den samme: Screener -> 1.Mand/Karm -> 4. Position -> Standby.
const ROTATION_ORDER = SPOR_POSITIONS;

function parseTime(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function formatTime(totalMinutes) {
  const m = ((totalMinutes % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const min = m % 60;
  return String(h).padStart(2, "0") + ":" + String(min).padStart(2, "0");
}

// Læser "HH:MM-HH:MM" og returnerer start/slut i minutter siden midnat.
// Slut lægges 24 timer til, hvis vagten går over midnat (fx nattevagt 21:00-05:30).
function parseShiftRange(shiftTime) {
  const [startStr, endStr] = shiftTime.split("-");
  const start = parseTime(startStr);
  let end = parseTime(endStr);
  if (end <= start) end += 1440;
  return { start, end };
}

// shiftTime: "HH:MM-HH:MM" (kan gå over midnat, fx nattevagt 21:00-05:30)
// startPosition: en af SPOR_POSITIONS
// swapped: bool, om 1. Mand/Karm skal starte omvendt af standard
function buildSchedule(shiftTime, startPosition, swapped) {
  const { start, end } = parseShiftRange(shiftTime);

  const totalMinutes = end - start;
  const slotCount = Math.round(totalMinutes / SLOT_MINUTES);
  const startIndex = ROTATION_ORDER.indexOf(startPosition);

  const rows = [];
  let rotCounter = 0;

  for (let i = 0; i < slotCount; i++) {
    const slotStart = start + i * SLOT_MINUTES;
    const slotEnd = slotStart + SLOT_MINUTES;
    const posIndex = (startIndex + i) % ROTATION_ORDER.length;

    let label;
    if (posIndex === 1) {
      const isFirstOfPair = rotCounter % 2 === 0;
      const normal = isFirstOfPair ? "1. Mand" : "Karm";
      const flipped = isFirstOfPair ? "Karm" : "1. Mand";
      label = swapped ? flipped : normal;
      rotCounter++;
    } else {
      label = ROTATION_ORDER[posIndex];
    }

    rows.push({
      time: formatTime(slotStart) + "-" + formatTime(slotEnd),
      position: label,
    });
  }

  return rows;
}

// shiftTime: "HH:MM-HH:MM"
// startPosition: en af FB_POSITIONS
// blockSize: 30 eller 45 (minutter)
// Rækkefølgen er altid FB Øst -> FB Vest -> Standby. Sidste blok afkortes så
// den altid slutter præcis ved vagtens sluttidspunkt.
function buildFremskudtSchedule(shiftTime, startPosition, blockSize) {
  const { start, end } = parseShiftRange(shiftTime);
  const startIndex = FB_POSITIONS.indexOf(startPosition);

  const rows = [];
  let cursor = start;
  let i = 0;

  while (cursor < end) {
    const slotEnd = Math.min(cursor + blockSize, end);
    const posIndex = (startIndex + i) % FB_POSITIONS.length;

    rows.push({
      time: formatTime(cursor) + "-" + formatTime(slotEnd),
      position: FB_POSITIONS[posIndex],
    });

    cursor = slotEnd;
    i++;
  }

  return rows;
}
