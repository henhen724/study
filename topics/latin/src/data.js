// Vocabulary focused on Roman epigraphy — the abbreviations and formulaic
// phrases actually found on inscriptions (tombstones, dedications, public
// monuments), rather than general classroom Latin. `note` gives the
// expansion for abbreviations, shown as a hint after answering.
export const WORDS = [
  // Funerary formulas
  { latin: "D M", english: "to the divine shades", note: "Dis Manibus — the standard opening of a Roman epitaph" },
  { latin: "D M S", english: "sacred to the divine shades", note: "Dis Manibus Sacrum" },
  { latin: "H S E", english: "he/she is buried here", note: "Hic Situs Est (Hic Sita Est for a woman)" },
  { latin: "H M H N S", english: "this monument will not pass to the heir", note: "Hoc Monumentum Heredem Non Sequetur" },
  { latin: "V A", english: "he/she lived ... years", note: "Vixit Annis" },
  { latin: "ANN", english: "years", note: "Annis / Annos" },
  { latin: "MENS", english: "months", note: "Mensibus" },
  { latin: "DIEB", english: "days", note: "Diebus" },
  { latin: "B M", english: "to the well-deserving one", note: "Bene Merenti" },
  { latin: "MERENTI", english: "to the deserving one" },
  { latin: "OPTIMO", english: "to the best (one)" },
  { latin: "CARISSIMO", english: "to the dearest (one)" },
  { latin: "CONIUGI", english: "to his/her spouse" },
  { latin: "MARITO", english: "to her husband" },
  { latin: "UXORI", english: "to his wife" },
  { latin: "FILIO", english: "to his/her son" },
  { latin: "FILIAE", english: "to his/her daughter" },
  { latin: "FRATRI", english: "to his/her brother" },
  { latin: "PARENTIBUS", english: "to his/her parents" },
  { latin: "MEMORIAE", english: "to the memory (of)" },
  { latin: "VIXIT", english: "lived" },
  { latin: "OBIIT", english: "died" },
  { latin: "NATUS", english: "born" },
  { latin: "PIUS", english: "devoted, dutiful" },
  { latin: "IN PACE", english: "in peace" },
  { latin: "R I P", english: "rests in peace", note: "Requiescit In Pace" },
  { latin: "S T T L", english: "may the earth be light on you", note: "Sit Tibi Terra Levis" },

  // Dedications and construction
  { latin: "D D", english: "gave as a gift", note: "Dono Dedit" },
  { latin: "EX VOTO", english: "in fulfillment of a vow" },
  { latin: "V S", english: "fulfilled a vow", note: "Votum Solvit" },
  { latin: "SACRUM", english: "sacred (to)" },
  { latin: "DEDIT", english: "gave" },
  { latin: "FECIT", english: "made (this)" },
  { latin: "POSUIT", english: "set up (this)" },
  { latin: "CURAVIT", english: "oversaw (the construction)" },
  { latin: "RESTITUIT", english: "restored" },
  { latin: "AEDIFICAVIT", english: "built" },

  // Titles and offices
  { latin: "IMP", english: "emperor, commander", note: "Imperator" },
  { latin: "CAES", english: "Caesar" },
  { latin: "AVG", english: "Augustus" },
  { latin: "P M", english: "chief priest", note: "Pontifex Maximus" },
  { latin: "COS", english: "consul" },
  { latin: "COS II", english: "consul for the second time" },
  { latin: "TR POT", english: "with tribunician power", note: "Tribunicia Potestate" },
  { latin: "P P", english: "father of the fatherland", note: "Pater Patriae" },
  { latin: "S P Q R", english: "the Senate and People of Rome", note: "Senatus Populusque Romanus" },
  { latin: "LEG", english: "legion, legate", note: "Legio / Legatus" },
  { latin: "PRAEF", english: "prefect", note: "Praefectus" },
  { latin: "SENATUS", english: "senate" },
  { latin: "POPULUS", english: "people" },
  { latin: "LIBERTUS", english: "freedman" },
  { latin: "SERVUS", english: "slave" },
  { latin: "DOMINUS", english: "master, lord" },
  { latin: "ANNORUM", english: "of ... years of age" },
];

export function buildDeck() {
  return WORDS;
}
