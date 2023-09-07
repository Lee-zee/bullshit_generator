import { randomInt, createRandomPicker } from './random.js';

function sentence(pick, replacer) {
  let ret = pick(); // 返回一个句子文本
  for (const key in replacer) { // replacer是一个对象，存放替换占位符的规则
    // 如果 replacer[key] 是一个 pick 函数，那么执行它随机取一条替换占位符，否则将它直接替换占位符
    ret = ret.replace(new RegExp(`{{${key}}}`, 'g'),
      typeof replacer[key] === 'function' ? replacer[key]() : replacer[key]);
  }
  return ret;
}

export function generate(title, {
  corpus,
  min = 6000,
  max = 10000
} = {}) {
  const articleLength = randomInt(min, max);
  const { famous, bosh_before, bosh, said, conclude } = corpus;
  const [pickFamous, pickBoshBefore, pickBosh, pickSaid, pickConclude] = [famous, bosh_before, bosh, said, conclude].map(createRandomPicker);

  const article = [];
  let totalLength = 0;

  while (totalLength < articleLength) {
    let section = '';
    const sectionLength = randomInt(200, 500) //每段字数200-500

    while (section.length < sectionLength || !/[。？]$/.test(section)) {
      const n = randomInt(0, 100) // n为概率
      if (n < 20) {
        section += sentence(pickFamous, { said: pickSaid, conclude: pickConclude });
      } else if (n < 50) {
        section += sentence(pickBoshBefore, { title }) + sentence(pickBosh, { title })
      } else {
        section += sentence(pickBosh, { title });
      }
    }
    totalLength += section.length;
    article.push(section);
  }

  return article;
}