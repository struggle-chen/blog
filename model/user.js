// 引入mongoose模板
const mongoose = require('mongoose');
// 引入bcrypt模板进行密码加密
const bcrypt = require('bcrypt');
// 创建集合的规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 确定邮箱的唯一性
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // admin: 超级管理员
    // normal 普通管理员
    role: {
        type: String,
        required: true
    },
    // 0表示默认是启用状态
    statue: {
        type: Number,
        default: 0
    }
});
// 创建集合用户
const user = mongoose.model('User', userSchema);
async function createUser() {
    // 返回生成的字符串
    const salt = await bcrypt.genSalt(10);
    // 返回加密后的密码
    const pass = await bcrypt.hash('123456', salt);
    const User = await user.create({
        username: 'chenhu',
        email: 'itheima@chen.com',
        password: pass,
        role: 'admin',
        statue: 0
    })
}
createUser();
// 对信息进行验证
const validata = async (data) => {
    const schema = {
        username: joi.string().min(2).max(10).required().error(new Error('用户名输入不规范')),
        email: joi.string().required().error(new Error('邮箱不符合规则')),
        password: joi.string().regex(/^[a-zA-Z0-9]{3,10}$/).required().error(new Error('密码输入不规范')),
        role: joi.string().valid('normal', 'admin').required().error(new Error('角色不符合')),
        statue: joi.number().valid(0, 1).required().error(new Error('状态码非法'))
    }
    return await joi.validate(data, schema)
}
module.exports = {
    user,
    validata
}
