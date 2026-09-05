# Maya-subset.woff2

A 5-glyph subset of **Maya** (v.4.14) by George Douros, part of his
[Unicode Fonts for Ancient Scripts](https://fontlibrary.org/en/font/maya)
project — "free for any use." The full font covers J. Eric S. Thompson's
1962 *Catalog of Maya Hieroglyphs*, encoded in the Unicode Supplementary
Private Use Area-A (Plane 15), keyed to Thompson's catalog numbers.

Subsetted from the original 1.5MB font down to ~4KB with `fonttools`,
keeping only the 5 codepoints actually used in
[../src/data.js](../src/data.js) (K'IN, TUN, AJAW, CHAN, BALAM — see the
`glyph`/`thompson` fields there). Each Thompson number → codepoint mapping
was read directly off the font's own published sign index (`Maya.pdf` in
the original distribution), and each Thompson number → reading was
cross-checked against published epigraphy sources rather than assumed.

To add another glyph: find its Thompson number and reading from a
citable source, look up its codepoint in the original `Maya.pdf` sign
index, then re-run:

```
python -m fontTools.subset Maya.ttf --unicodes=U+XXXXX,... --output-file=Maya-subset.woff2 --flavor=woff2 --no-layout-closure --glyph-names --notdef-glyph --recommended-glyphs
```
