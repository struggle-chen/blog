const {user} = require('../../model/user');
const bcrypt = require('bcrypt')
module.exports = async(req, res, next) => {
    const body = req.body;
    const id = req.query.id;
    const User = await user.findOne({_id: id});
    
    // 进行密码比对
    let isPass = await bcrypt.compare(body.password, User.password);
    if(isPass) {
            await user.updateOne({_id: id}, {
            username: body.username,
            email: body.email,
            role: body.role,
            statue: body.statue
        });
        res.redirect('/admin/user')
        // res.send('密码比对成功')
    } else {
        let obj = {path: '/admin/user-edit', message: '密码错误，请重新输入', id: id}
       next(JSON.stringify(obj));
    }
}