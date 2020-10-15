// 引用express模板
const express = require('express');
// 创建博客管理页面路由
const admin = express.Router();
admin.get('/login', require('./admin/loginPage'))
// 用户的登录路由
admin.post('/login', require('./admin/login'))
admin.get('/user', require('./admin/user'))
// 用户编辑路由
admin.get('/user-edit', require('./admin/user-edit'))
admin.post('/user-edit', require('./admin/user-edit-f'))
admin.post('/user-modify', require('./admin/user-modify'))
// 用户删除路由
admin.get('/user-delete', require('./admin/user-delete'));
// 文章管理路由
admin.get('/article', require('./admin/article'))
// 发布新文章路由
admin.get('/article-edit', require('./admin/article-edit'))
// 增加文章信息路由
admin.post('/article-add', require('./admin/article-add'));
// 用户编辑文章路由
admin.post('/article-modify', require('./admin/article-modify'))
// 文章删除路由
admin.get('/article-delete', require('./admin/article-delete'))
// 将路由对象作为模板进行导出
module.exports = admin;