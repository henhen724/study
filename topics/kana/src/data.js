// English loanwords (gairaigo) written in katakana, plus romaji and meaning.
// Hiragana forms are derived automatically from the katakana (see katakanaToHiragana
// below) so the same word can be practiced in either script.
export const WORDS = [
  { katakana: "コーヒー", romaji: "koohii", english: "coffee" },
  { katakana: "テレビ", romaji: "terebi", english: "television" },
  { katakana: "ホテル", romaji: "hoteru", english: "hotel" },
  { katakana: "パン", romaji: "pan", english: "bread" },
  { katakana: "ビール", romaji: "biiru", english: "beer" },
  { katakana: "カメラ", romaji: "kamera", english: "camera" },
  { katakana: "タクシー", romaji: "takushii", english: "taxi" },
  { katakana: "レストラン", romaji: "resutoran", english: "restaurant" },
  { katakana: "コンピューター", romaji: "konpyuutaa", english: "computer" },
  { katakana: "インターネット", romaji: "intaanetto", english: "internet" },
  { katakana: "アイスクリーム", romaji: "aisukuriimu", english: "ice cream" },
  { katakana: "サラダ", romaji: "sarada", english: "salad" },
  { katakana: "ジュース", romaji: "juusu", english: "juice" },
  { katakana: "ミルク", romaji: "miruku", english: "milk" },
  { katakana: "チーズ", romaji: "chiizu", english: "cheese" },
  { katakana: "ケーキ", romaji: "keeki", english: "cake" },
  { katakana: "チョコレート", romaji: "chokoreeto", english: "chocolate" },
  { katakana: "スポーツ", romaji: "supootsu", english: "sports" },
  { katakana: "サッカー", romaji: "sakkaa", english: "soccer" },
  { katakana: "テニス", romaji: "tenisu", english: "tennis" },
  { katakana: "ピアノ", romaji: "piano", english: "piano" },
  { katakana: "ギター", romaji: "gitaa", english: "guitar" },
  { katakana: "ラジオ", romaji: "rajio", english: "radio" },
  { katakana: "カレンダー", romaji: "karendaa", english: "calendar" },
  { katakana: "ノート", romaji: "nooto", english: "notebook" },
  { katakana: "ペン", romaji: "pen", english: "pen" },
  { katakana: "バス", romaji: "basu", english: "bus" },
  { katakana: "メール", romaji: "meeru", english: "email" },
  { katakana: "ソファ", romaji: "sofa", english: "sofa" },
  { katakana: "テーブル", romaji: "teeburu", english: "table" },
  { katakana: "ベッド", romaji: "beddo", english: "bed" },
  { katakana: "シャワー", romaji: "shawaa", english: "shower" },
  { katakana: "トイレ", romaji: "toire", english: "toilet" },
  { katakana: "エレベーター", romaji: "erebeetaa", english: "elevator" },
  { katakana: "エスカレーター", romaji: "esukareetaa", english: "escalator" },
  { katakana: "スーパー", romaji: "suupaa", english: "supermarket" },
  { katakana: "デパート", romaji: "depaato", english: "department store" },
  { katakana: "レモン", romaji: "remon", english: "lemon" },
  { katakana: "オレンジ", romaji: "orenji", english: "orange" },
  { katakana: "バナナ", romaji: "banana", english: "banana" },
  { katakana: "トマト", romaji: "tomato", english: "tomato" },
  { katakana: "サンドイッチ", romaji: "sandoitchi", english: "sandwich" },
  { katakana: "ハンバーガー", romaji: "hanbaagaa", english: "hamburger" },
  { katakana: "ピザ", romaji: "piza", english: "pizza" },
  { katakana: "パスタ", romaji: "pasuta", english: "pasta" },
  { katakana: "ワイン", romaji: "wain", english: "wine" },
  { katakana: "ジャム", romaji: "jamu", english: "jam" },
  { katakana: "バター", romaji: "bataa", english: "butter" },
  { katakana: "ヨーグルト", romaji: "yooguruto", english: "yogurt" },
  { katakana: "アルバム", romaji: "arubamu", english: "album" },
  { katakana: "カップ", romaji: "kappu", english: "cup" },
  { katakana: "ナイフ", romaji: "naifu", english: "knife" },
  { katakana: "フォーク", romaji: "fooku", english: "fork" },
  { katakana: "ドア", romaji: "doa", english: "door" },
  { katakana: "カード", romaji: "kaado", english: "card" },
  { katakana: "バッグ", romaji: "baggu", english: "bag" },
  { katakana: "シャツ", romaji: "shatsu", english: "shirt" },
  { katakana: "スカート", romaji: "sukaato", english: "skirt" },
  { katakana: "ジーンズ", romaji: "jiinzu", english: "jeans" },
  { katakana: "サングラス", romaji: "sangurasu", english: "sunglasses" },
];

// Katakana and hiragana occupy parallel Unicode ranges, offset by 0x60
// (e.g. コ U+30B3 -> こ U+3053). The chouonpu (ー) has no hiragana
// equivalent, so it passes through unchanged.
export function katakanaToHiragana(text) {
  return text.replace(/[ァ-ヶ]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0x60)
  );
}

export function buildDeck() {
  return WORDS.map((w) => ({
    ...w,
    hiragana: katakanaToHiragana(w.katakana),
  }));
}
