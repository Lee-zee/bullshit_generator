import {generate} from './lib/generator.js';
import {loadCorpus, saveCorpus} from './lib/corpus.js';
import {createRandomPicker} from './lib/random.js';
import {interact} from './lib/interact.js';
import {options} from './lib/cmd.js';

// function parseOptions(options = {}) {
//   const argv = process.argv;
//   for (let i = 2; i < argv.length; i++) {
//     const cmd = argv[i - 1];
//     const value = argv[i];

//     if (cmd === '--title') {
//       options.title = value;
//     } else if (cmd === '--min') {
//       options.min = Number(value);
//     } else if (cmd === '--max') {
//       options.max = Number(value);
//     }
//   }
//   return options;
// }

const corpus = loadCorpus('corpus/data.json');
let title = options.title || createRandomPicker(corpus.title)();

(async function () {
    if (Object.keys(options).length <= 0) {
        const answer = await interact([
            {text: '请输入文章主题', value: title},
            {text: '请输入最小字数', value: 6000},
            {text: '请输入最大字数', value: 10000},
        ])

        title = answer[0];
        options.min = Number(answer[1]);
        options.max = Number(answer[2]);
    }


    const article = generate(title, {corpus})
    const output = saveCorpus(title, article)
    console.log(`文章生成成功，保存在${output}`);
}())





