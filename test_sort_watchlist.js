const fs = require('fs');
const html = fs.readFileSync('pages/watchlist.html', 'utf8');
const regex = /<article class="card"[^>]*>.*?<h3>(.*?)<\/h3>.*?<span class="watchlist-year">(\d{4})\/(\d{1,2})<\/span>/gs;
const entries = [];
let m;
while ((m = regex.exec(html)) !== null) {
  entries.push({ title: m[1].trim(), year: Number(m[2]), month: Number(m[3]) });
}

const strokeCollator = new Intl.Collator('zh-Hant-u-co-stroke', { numeric: true, sensitivity: 'base' });
const getTitleKey = (title) => {
  const cleaned = title.replace(/^[\s「『《〈【]+/, '');
  const chars = Array.from(cleaned).filter((ch) => ch.trim() !== '');
  return chars.slice(0, 3).join('');
};

const sorted = entries.slice().sort((a,b) => {
  const ka = getTitleKey(a.title);
  const kb = getTitleKey(b.title);
  const titleDiff = strokeCollator.compare(ka, kb);
  if (titleDiff !== 0) return titleDiff;
  if (a.year !== b.year) return a.year - b.year;
  return a.month - b.month;
});

console.log('total entries:', entries.length);
console.log('sample first 30 titles after sort:');
for (let i = 0; i < 30 && i < sorted.length; i++) {
  const e = sorted[i];
  console.log(`${i+1}. [${getTitleKey(e.title)}] ${e.year}/${e.month} ${e.title}`);
}

