// 引用express模板
const express = require('express');
// 创建博客展示页面路由
const home = express.Router();
// 文章网页路由
home.get('/', require('./home/index'))
// 文章管理页面路由
home.get('/article', require('./home/article'))
// 将路由对象作为模板进行导出
module.exports = home;