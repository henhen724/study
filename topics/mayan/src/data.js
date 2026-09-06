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

// Entries below that carry `glyphs` render an actual Classic-period sign
// sequence, not a stylized approximation — either a single logogram
// (whole-word sign) or a word spelled phonetically with syllable signs
// (syllabograms), the way Maya writing genuinely mixes both strategies.
// Rendered with the Maya font (see fonts/Maya-subset.woff2), a free
// work-font by George Douros covering J. Eric S. Thompson's 1962 "Catalog
// of Maya Hieroglyphs" via Unicode Supplementary Private Use Area-A
// codepoints keyed to Thompson's catalog numbers. Each mapping (Thompson #
// -> codepoint) was read directly off the font's own published sign
// index, and each Thompson number -> reading was cross-checked against
// published epigraphy sources rather than assumed — see `thompson` for
// the citation(s), in reading order.
export const VOCAB = [
  { type: "vocab", maya: "K'IN", english: "day", note: "the basic Long Count unit — 1 day", glyphs: ["\u{F6599}"], thompson: ["T544"] },
  { type: "vocab", maya: "WINAL", english: "20 days", note: "a Long Count period of 20 k'in" },
  { type: "vocab", maya: "TUN", english: "360 days", note: "a Long Count period of 18 winal", glyphs: ["\u{F659D}"], thompson: ["T548"] },
  { type: "vocab", maya: "K'ATUN", english: "20 tun", note: "≈19.7 years — a Long Count period of 20 tun" },
  { type: "vocab", maya: "B'AK'TUN", english: "20 k'atun", note: "≈394 years — the largest commonly-used Long Count period" },
  { type: "vocab", maya: "HAAB'", english: "year, 365-day calendar", note: "the vague-year solar calendar" },
  { type: "vocab", maya: "TZOLK'IN", english: "the 260-day ritual calendar", note: "combines 20 day names with the numbers 1-13" },
  { type: "vocab", maya: "AJAW", english: "lord, king", note: "the most common royal title", glyphs: ["\u{F628A}"], thompson: ["T168"] },
  { type: "vocab", maya: "K'UHUL AJAW", english: "holy lord", note: "the title used in Emblem Glyphs of ruling dynasties" },
  { type: "vocab", maya: "CH'OK", english: "youth, prince", note: "used for a young or not-yet-enthroned royal heir" },
  { type: "vocab", maya: "U BAAH", english: "(is) the image of", note: "a common caption formula on royal portraits" },
  { type: "vocab", maya: "CHUM", english: "was seated", note: "short for chumlaj — the verb for a ruler's accession" },
  { type: "vocab", maya: "NA", english: "house", note: "spelled with a single syllable sign, na", glyphs: ["\u{F6219}"], thompson: ["T23.1"] },
  { type: "vocab", maya: "CHAN", english: "sky", note: "in Yucatec, the related word kaan also means \"snake\" and \"four\"", glyphs: ["\u{F65AB}"], thompson: ["T561a"] },
  { type: "vocab", maya: "KAB'", english: "earth", note: "spelled syllabically, ka-b'a", glyphs: ["\u{F621B}", "\u{F62CA}"], thompson: ["T25.1", "T251.1"] },
  { type: "vocab", maya: "K'AK'", english: "fire", note: "spelled syllabically, k'a-k'(a), reduplicating the same sign", glyphs: ["\u{F6268}", "\u{F6268}"], thompson: ["T122.1", "T122.1"] },
  { type: "vocab", maya: "HA'", english: "water", note: "spelled with a single syllable sign, ha", glyphs: ["\u{F63E5}"], thompson: ["T208"] },
  { type: "vocab", maya: "WINIK", english: "person, man", note: "spelled syllabically, wi-ni-k(i)", glyphs: ["\u{F6262}", "\u{F6261}", "\u{F6253}"], thompson: ["T117.1", "T116.1", "T100.1"] },
  { type: "vocab", maya: "IXIK", english: "woman, lady", note: "spelled syllabically, i-xi-k(i)", glyphs: ["\u{F62C3}", "\u{F641E}", "\u{F6253}"], thompson: ["T237.1", "T271", "T100.1"] },
  { type: "vocab", maya: "MUT", english: "bird", note: "spelled syllabically, mu-t(i)", glyphs: ["\u{F6217}", "\u{F623A}"], thompson: ["T19.1", "T59.1"] },
  { type: "vocab", maya: "BALAM", english: "jaguar", note: "a jaguar head — common in royal names, e.g. Yaxuun Bahlam", glyphs: ["\u{F66B3}"], thompson: ["T751a"] },
  { type: "vocab", maya: "K'AWIL", english: "a god of royal power", note: "often shown held as a sceptre by rulers" },
];

export function buildDeck() {
  return [...NUMERALS, ...VOCAB];
}
