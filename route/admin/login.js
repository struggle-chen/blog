// 引入bcrypt模板进行密码加密
const bcrypt = require('bcrypt');
// 引入用户创建的集合
const {user} = require('../../model/user')
module.exports = async (req, res) => {
    // 接受请求参数
    const {email, password} = req.body;
    if(email.trim().length == 0 || password.trim().length == 0) {
       return res.status(400).render('admin/error', {msg: '邮箱地址和密码错误'})
    }
    let User = await user.findOne({email});
    // console.log(password);
    // 密码比对
    let isPass = await bcrypt.compare(password, User.password)
    if(User) {
        if(isPass) {
            // res.send('登陆成功')
            // 将用户名存储在请求对象中, username是向req中添加的属性
            req.session.username = User.username;
            // console.log(User.username);
            // console.log(req.session.username);
            // locals对象用于将数据传递至所渲染的模板中
            req.app.locals.userInfor = User;
            // 重新定位到user页面
            res.redirect('/admin/user')
        } else {
            res.status(400).render('admin/error', {msg: '邮箱地址和密码错误'})
        }
    } else {
        res.status(400).render('admin/error', {msg: '邮箱地址和密码错误'})
    }
}