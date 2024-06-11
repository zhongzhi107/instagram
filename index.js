/**
 * 检测取关的用户
 */

function filterText(input) {
    // 将输入字符串按行分割成数组
    let lines = input.split('\n');
    let result = [];

    for (let i = 0; i < lines.length; i++) {
        // 检查当前行是否以“的头像”结尾
        if (lines[i].endsWith('的头像')) {
            // 如果是，则将下一行添加到结果数组中
            if (i + 1 < lines.length) {
                result.push(lines[i + 1]);
            }
            // 跳过下一行，因为已经处理过
            i++;
        }
    }

    return result;
}

const followings = filterText(require('./following-data'));
const followers = filterText(require('./followers-data'));
const whitelist = require('./whitelist-data');

// 互粉的
let mutualFollowers = [];

// 我单向关注别人的
let iFollowers = [];

// 别人单向关注我的
let followMeUsers = [];

followings.forEach((follow) => {
  // 是否互粉
  if (followers.includes(follow)) {
    mutualFollowers.push(follow);
  } else if (!whitelist.includes(follow)) {
    iFollowers.push(follow);
  }
});

followers.forEach((follower) => {
  if (!followings.includes(follower)) {
    followMeUsers.push(follower);
  }
});

// console.log('\n互粉的(%s)', mutualFollowers.length);
// console.log(mutualFollowers.join('\n'));

console.log('\n我单向关注别人的(%s)', iFollowers.length);
console.log(iFollowers.join('\n'));

// console.log('\n别人单向关注我的(%s)', followMeUsers.length);
// console.log(followMeUsers.join('\n'));