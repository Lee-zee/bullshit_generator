//[
//    {text:'请输入文章主题',value:title},
//    {text:'请输入最小字数',value:6000},
//    {text:'请输入最大字数',value:10000},
//]
//
//export function interact(questions) {
//    process.stdin.setEncoding('utf-8');
//
//    return new Promise((resolve) => {
//        const answer = [];
//        let i = 0;
//        let {text, value} = questions[i++];
//        console.log(`${text}(${value})`);
//
//        process.stdin.on('readable', () => {
//            const chunk = process.stdin.read().slice(0, -1);
//            answer.push(chunk || value)
//            const nextQuestion = questions[i++];
//            if (nextQuestion) {
//                process.stdin.read()
//                text = nextQuestion.text;
//                value = nextQuestion.value;
//                console.log(`${text}(${value})`)
//            } else {
//                resolve(answer)
//            }
//        })
//    })
//}

import readline from 'readline';

function question(rl, {text, value}) {
    const q = `${text}(${value})\n`;
    return new Promise((resolve) => {
        rl.question(q, (answer) => {
            resolve(answer || value)
        })
    })
}

export async function interact(questions) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const answers = [];
    for (let i = 0; i < questions.length; i++) {
        const q = questions[i];
        const answer = await question(rl, q);
        answers.push(answer)
    }

    rl.close();
    return answers;
}

