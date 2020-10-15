const {article} = require('../../model/article')
// 导入分页模板
const pagination = require('mongoose-sex-page');
module.exports = async(req, res) => {
    let page = req.query.page;
    // 在数据库中查询数据
    // page 指定当前页
	// size 指定每页显示的数据条数
	// display 指定客户端要显示的页码数量
	// exec 向数据库中发送查询请求
	// 查询所有文章数据
    let result = await pagination(article).page(page).size(4).display(5).find({}).exec();
    // res.send(result)
    // 渲染模板并传递数据
    res.render('home/index', {
        result: result
    })
}