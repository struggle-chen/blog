// 引入joi模板
const joi = require('joi');
// 创建验证规则
const schema = {
    username: joi.string().min(2).max(5).required().error(new Error('用户名输入不规范'))
}
async function run() {
    try {
        await joi.validate({username: 'ab'}, schema)
    }catch(e) {
        console.log(e.message);
        return;
    }
    console.log('验证成功');
}
run();