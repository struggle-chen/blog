const {user} = require('../../model/user')
module.exports = async(req, res) => {
    // 标识 当前访问的是用户管理页面
    req.app.locals.cutten = 'user';
    // 接收客户端传递过来的当前页参数
    let page = req.query.page;
    // 每页显示的数据条数
    let size = 5;
    // 总数据
    let count = await user.countDocuments({});
    // 总页数
    let total = Math.ceil(count/size);
    // 从哪条数据开始
    let start = (page - 1) * size;
    const users = await user.find({}).limit(size).skip(start);
    res.render('admin/user', {
        users: users,
        page: page,
        total: total
    })
};