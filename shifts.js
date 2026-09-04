// Definition af alle vagttyper, grupperet efter kategori.
const SHIFT_CATEGORIES = [
  {
    name: "Morgenvagt",
    times: ["04:00-14:00", "04:30-13:30", "05:00-13:00"],
  },
  {
    name: "Aftenvagt",
    times: ["11:45-19:45", "12:15-21:15", "13:45-22:45"],
  },
  {
    name: "Nattevagt",
    times: ["21:00-05:30"],
  },
];

// De fire positioner en spor-vagt kan starte på / rotere igennem.
const SPOR_POSITIONS = ["Screener", "1. Mand/Karm", "4. Position", "Standby"];

// De tre positioner en fremskudt boarding-vagt kan starte på / rotere igennem.
const FB_POSITIONS = ["FB Øst", "FB Vest", "Standby"];
