// 引入bcrypt模板进行密码加密
const bcrypt = require('bcrypt');
async function run() {
    // 生成随机字符串
    // genSalt方法接受一个数值作为参数
    // 数值越大 生成的随机字符串复杂度越大
    // 数值越小生成的随机字符串复杂度越低
    // 默认是10
    // 返回生成的字符串
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
    // 对密码进行加密
    // 1.要进行加密的原文
    // 2.随机字符串
    // 返回加密后的密码
    const result = await bcrypt.hash('123456', salt);
    console.log(result);  
}
run();