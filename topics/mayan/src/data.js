// Two things that are genuinely learnable without needing real glyph
// images: the bar-and-dot numeral system (used throughout every Long
// Count date on a monument), and a conservative set of core epigraphic
// vocabulary (calendar units, titles, common formulaic phrases) using
// standard modern Mayanist transliteration.

// A dot = 1, a bar = 5, a shell = 0. Any value 0-19 is bars stacked below
// dots, exactly as it appears in a single position of a Long Count date.
export const NUMERALS = Array.from({ length: 20 }, (_, value) => {
  const bars = Math.floor(value / 5);
  const dots = value % 5;
  let note;
  if (value === 0) {
    note = "the shell glyph marks zero";
  } else if (bars === 0) {
    note = `${dots} dot${dots > 1 ? "s" : ""} = ${value}`;
  } else if (dots === 0) {
    note = `${bars} bar${bars > 1 ? "s" : ""} (×5) = ${value}`;
  } else {
    note = `${bars} bar${bars > 1 ? "s" : ""} (×5) + ${dots} dot${dots > 1 ? "s" : ""} = ${value}`;
  }
  return { type: "numeral", value, english: String(value), note };
});

// Five entries below also carry a `glyph` — an actual Classic-period sign
// shape, not a stylized approximation. These are rendered with the Maya
// font (see fonts/Maya-subset.woff2), a free work-font by George Douros
// covering J. Eric S. Thompson's 1962 "Catalog of Maya Hieroglyphs" via
// Unicode Supplementary Private Use Area-A codepoints keyed to Thompson's
// catalog numbers. Each mapping (Thompson # -> codepoint) was read
// directly off the font's own published sign index, and each Thompson
// number -> reading was cross-checked against published epigraphy
// sources rather than assumed — see `thompson` for the citation.
export const VOCAB = [
  { type: "vocab", maya: "K'IN", english: "day", note: "the basic Long Count unit — 1 day", glyph: "\u{F6599}", thompson: "T544" },
  { type: "vocab", maya: "WINAL", english: "20 days", note: "a Long Count period of 20 k'in" },
  { type: "vocab", maya: "TUN", english: "360 days", note: "a Long Count period of 18 winal", glyph: "\u{F659D}", thompson: "T548" },
  { type: "vocab", maya: "K'ATUN", english: "20 tun", note: "≈19.7 years — a Long Count period of 20 tun" },
  { type: "vocab", maya: "B'AK'TUN", english: "20 k'atun", note: "≈394 years — the largest commonly-used Long Count period" },
  { type: "vocab", maya: "HAAB'", english: "year, 365-day calendar", note: "the vague-year solar calendar" },
  { type: "vocab", maya: "TZOLK'IN", english: "the 260-day ritual calendar", note: "combines 20 day names with the numbers 1-13" },
  { type: "vocab", maya: "AJAW", english: "lord, king", note: "the most common royal title", glyph: "\u{F628A}", thompson: "T168" },
  { type: "vocab", maya: "K'UHUL AJAW", english: "holy lord", note: "the title used in Emblem Glyphs of ruling dynasties" },
  { type: "vocab", maya: "CH'OK", english: "youth, prince", note: "used for a young or not-yet-enthroned royal heir" },
  { type: "vocab", maya: "U BAAH", english: "(is) the image of", note: "a common caption formula on royal portraits" },
  { type: "vocab", maya: "CHUM", english: "was seated", note: "short for chumlaj — the verb for a ruler's accession" },
  { type: "vocab", maya: "NA", english: "house" },
  { type: "vocab", maya: "CHAN", english: "sky", note: "in Yucatec, the related word kaan also means \"snake\" and \"four\"", glyph: "\u{F65AB}", thompson: "T561a" },
  { type: "vocab", maya: "KAB'", english: "earth" },
  { type: "vocab", maya: "K'AK'", english: "fire" },
  { type: "vocab", maya: "HA'", english: "water" },
  { type: "vocab", maya: "WINIK", english: "person, man" },
  { type: "vocab", maya: "IXIK", english: "woman, lady" },
  { type: "vocab", maya: "MUT", english: "bird" },
  { type: "vocab", maya: "BALAM", english: "jaguar", note: "a jaguar head — common in royal names, e.g. Yaxuun Bahlam", glyph: "\u{F66B3}", thompson: "T751a" },
  { type: "vocab", maya: "K'AWIL", english: "a god of royal power", note: "often shown held as a sceptre by rulers" },
];

export function buildDeck() {
  return [...NUMERALS, ...VOCAB];
}
