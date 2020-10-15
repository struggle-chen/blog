const {article} = require('../../model/article')
module.exports = async(req, res) => {
    // res.send('ok')
    let id = req.query.id;
    // console.log(id);
    await article.findOneAndDelete({_id: id});
    res.redirect('/admin/article');
}