// Basic native Japanese vocabulary (not loanwords — see the katakana &
// hiragana topic for those). Written in hiragana, the way a beginner
// reads them; `note` gives the standard kanji as a hint shown after
// answering, for words that are normally written in kanji.
export const WORDS = [
  // Greetings & common phrases
  { kana: "こんにちは", english: "hello" },
  { kana: "おはよう", english: "good morning" },
  { kana: "こんばんは", english: "good evening" },
  { kana: "さようなら", english: "goodbye" },
  { kana: "ありがとう", english: "thank you" },
  { kana: "すみません", english: "excuse me, sorry" },
  { kana: "はい", english: "yes" },
  { kana: "いいえ", english: "no" },

  // Numbers
  { kana: "いち", english: "one", note: "一" },
  { kana: "に", english: "two", note: "二" },
  { kana: "さん", english: "three", note: "三" },
  { kana: "よん", english: "four", note: "四" },
  { kana: "ご", english: "five", note: "五" },
  { kana: "ろく", english: "six", note: "六" },
  { kana: "なな", english: "seven", note: "七" },
  { kana: "はち", english: "eight", note: "八" },
  { kana: "きゅう", english: "nine", note: "九" },
  { kana: "じゅう", english: "ten", note: "十" },

  // Family
  { kana: "はは", english: "mother", note: "母" },
  { kana: "ちち", english: "father", note: "父" },
  { kana: "あね", english: "older sister", note: "姉" },
  { kana: "あに", english: "older brother", note: "兄" },
  { kana: "いもうと", english: "younger sister", note: "妹" },
  { kana: "おとうと", english: "younger brother", note: "弟" },

  // Animals
  { kana: "ねこ", english: "cat", note: "猫" },
  { kana: "いぬ", english: "dog", note: "犬" },
  { kana: "とり", english: "bird", note: "鳥" },
  { kana: "さかな", english: "fish", note: "魚" },
  { kana: "うま", english: "horse", note: "馬" },

  // Nature
  { kana: "みず", english: "water", note: "水" },
  { kana: "き", english: "tree", note: "木" },
  { kana: "やま", english: "mountain", note: "山" },
  { kana: "かわ", english: "river", note: "川" },
  { kana: "そら", english: "sky", note: "空" },
  { kana: "つき", english: "moon", note: "月" },
  { kana: "ひ", english: "fire", note: "火" },

  // Colors
  { kana: "あか", english: "red", note: "赤" },
  { kana: "あお", english: "blue", note: "青" },
  { kana: "しろ", english: "white", note: "白" },
  { kana: "くろ", english: "black", note: "黒" },
  { kana: "きいろ", english: "yellow", note: "黄色" },
  { kana: "みどり", english: "green", note: "緑" },

  // Food
  { kana: "ごはん", english: "rice, meal", note: "ご飯" },
  { kana: "おちゃ", english: "tea", note: "お茶" },
  { kana: "みそ", english: "miso", note: "味噌" },

  // Objects & places
  { kana: "ほん", english: "book", note: "本" },
  { kana: "くるま", english: "car", note: "車" },
  { kana: "いえ", english: "house", note: "家" },
  { kana: "がっこう", english: "school", note: "学校" },
  { kana: "せんせい", english: "teacher", note: "先生" },
  { kana: "がくせい", english: "student", note: "学生" },
  { kana: "ともだち", english: "friend", note: "友達" },
  { kana: "じかん", english: "time", note: "時間" },

  // Adjectives
  { kana: "おおきい", english: "big", note: "大きい" },
  { kana: "ちいさい", english: "small", note: "小さい" },
  { kana: "あつい", english: "hot (weather)", note: "暑い" },
  { kana: "さむい", english: "cold (weather)", note: "寒い" },
  { kana: "おいしい", english: "delicious", note: "美味しい" },
  { kana: "たのしい", english: "fun, enjoyable", note: "楽しい" },
  { kana: "あたらしい", english: "new", note: "新しい" },
  { kana: "ふるい", english: "old", note: "古い" },

  // Verbs
  { kana: "たべる", english: "to eat", note: "食べる" },
  { kana: "のむ", english: "to drink", note: "飲む" },
  { kana: "みる", english: "to see, watch", note: "見る" },
  { kana: "きく", english: "to hear, listen", note: "聞く" },
  { kana: "いく", english: "to go", note: "行く" },
  { kana: "くる", english: "to come", note: "来る" },
  { kana: "する", english: "to do" },
  { kana: "ある", english: "to exist (things)" },
  { kana: "いる", english: "to exist (people, animals)" },
];

export function buildDeck() {
  return WORDS;
}
