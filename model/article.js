const mongoose = require('mongoose');
// 创建集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 1,
        required: [true, '请输入文章标题']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请输入作者']
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String
    },
    content: {
        type: String,
        required: true
    }
})
const article = mongoose.model('Article', articleSchema);
module.exports = {
    article
}