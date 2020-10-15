// 引入formidable模板 作用:解析表单,支持get,post请求参数,文件上传
const formidable = require('formidable');
const path = require('path');
const {article} = require('../../model/article');
module.exports = (req, res) => {
    // 设置formidable表单解析对象
    const form = new formidable.IncomingForm();
    // 设置客户上传文件存储的路径
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'upload');
    // 保留上传文件的后缀名
    form.keepExtensions = true;
    // 解析表单
    form.parse(req, async(err, fields, files) => {
        // res.send(fields)
        // res.send(files)
        // 上传图片的路径
        // console.log(files.cover.path);
        await article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        })
         res.redirect('/admin/article')

    })
    // res.send('ok')
}