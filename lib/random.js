// randomInt 函数返回一个大于等于 min，小于 max 的随机整数
export function randomInt(min, max) {
  const p = Math.random();
  return Math.floor(min * (1 - p) + max * p);
}

// 避免重复选取
// 方法1
// 会重复选取，需要变量缓存
// let lastPick = null;
// // 随机选出数组中的一个元素
// export function randomPick(arr) {
//   let picked = null;
//   do {
//     const index = randomInt(0, arr.length);
//     picked = arr[index];
//   } while (picked === lastPick);
//   lastPick = picked;
//   return picked;
// }

// 方法2
// 只选取length-1项，再将index项与length-1项调换位置
// 特点：第一次无法选到最后一项
// export function randomPick(arr) {
//   arr = [...arr]
//   const len = arr.length - 1;
//   const index = randomInt(0, len);
//   [arr[index], arr[len]] = [arr[len], arr[index]]
//   return arr[index];
// }


// 方法3
// 方法2优化版
// 高阶函数，初始化时执行一次，
export function createRandomPicker(arr) {
  arr = [...arr]
  function randomPick() {
    const len = arr.length - 1;
    const index = randomInt(0, len);
    const picked = arr[index];
    [arr[index], arr[len]] = [arr[len], arr[index]]
    return picked;
  }
  randomPick();// 抛弃第一次选择结果
  return randomPick;
}
