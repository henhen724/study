# Maya-subset.woff2

A 17-glyph subset of **Maya** (v.4.14) by George Douros, part of his
[Unicode Fonts for Ancient Scripts](https://fontlibrary.org/en/font/maya)
project — "free for any use." The full font covers J. Eric S. Thompson's
1962 *Catalog of Maya Hieroglyphs* (862 entries total: 370 affixes, 356
main signs, 88 portraits, 48 uncertain), encoded in the Unicode
Supplementary Private Use Area-A (Plane 15), keyed to Thompson's catalog
numbers.

Subsetted from the original 1.5MB font down to ~9KB with `fonttools`,
keeping only the codepoints actually used in
[../src/data.js](../src/data.js) (see the `glyphs`/`thompson` fields
there):

- **Logograms** (whole-word signs): K'IN, TUN, AJAW, CHAN, BALAM.
- **Syllabograms**, used to spell words phonetically the way Maya
  scribes routinely did (Maya writing is logo-syllabic, not purely
  logographic — see [mayaglyphs.org's concordance](https://mayaglyphs.org/concCMGG.html)
  for the syllable → Thompson-number cross-reference used here): the
  signs behind NA, KAB', K'AK', HA', WINIK, and IXIK, plus MUT.

Each Thompson number → codepoint mapping was read directly off the
font's own published sign index (`Maya.pdf` in the original
distribution) — visually confirmed against the actual page images, not
parsed from flattened PDF text (an earlier attempt at the latter produced
a wrong pairing). Each Thompson number → reading/phonetic-value was
cross-checked against published epigraphy sources rather than assumed.

To add another glyph: find its Thompson number and reading (or phonetic
value, for a syllabogram) from a citable source, look up its codepoint in
the original `Maya.pdf` sign index, then re-run:

```
python -m fontTools.subset Maya.ttf --unicodes=U+XXXXX,... --output-file=Maya-subset.woff2 --flavor=woff2 --no-layout-closure --glyph-names --notdef-glyph --recommended-glyphs
```
