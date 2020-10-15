
const {user} = require('../../model/user');
module.exports = async(req, res) => {
    req.app.locals.cutten = 'user';
    // console.log(req.query.message);
    const {message, id} = req.query;
    // res.send(User)
    const User = await user.findOne({_id:id})
    // console.log(User);
    req.app.locals.userInfo = User;
    // 如果当前传递了id参数
    if(id) {
        const User = await user.findOne({_id: id});
        // 把信息渲染倒模班中
        res.render('admin/user-edit', {
            message: message,
            User: User,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        })
    } else {
        res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: '添加'
        })
    }
}