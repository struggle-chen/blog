const {article} = require('../../model/article');
module.exports = async(req, res) => {
    // 接受客户传递过来的page
    let page = req.query.page;
    // 每页显示的数据条数
    const size = 5;
    // 总数据条数
    let count = await article.countDocuments({});
    // 总页数
    let total = Math.ceil(count / size);
    // 从那条数据开始
    let start = (page - 1) * 5;
    // 标识 当前访问的是文章管理页面
    req.app.locals.cutten = 'article';
    // 多集合中联合查询
    const Article = await article.find().limit(size).skip(start);
    // res.send(Article)
    res.render('admin/article', {
        Article: Article,
        page: page,
        total: total
    })
}