const {article} = require('../../model/article');
module.exports = async(req, res) => {
    req.app.locals.cutten = 'article';
    const id = req.query.id;
    // console.log(id);
    // 判断是否有ID参数
    if(id) {
        let Article = await article.findOne({_id: id});
        // res.send(Article)
        res.render('admin/article-edit', {
            Article: Article,
            link: '/admin/article-modify?id=' + id,
            button: '修改'
        })
    } else {
        res.render('admin/article-edit', {
            link: '/admin/article-add',
            button: '提交'
        })
    }
    // res.render('admin/article-edit')
}