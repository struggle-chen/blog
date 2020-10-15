// 引用express模板
const express = require('express');
// 引入express-session模板
const session = require('express-session');
// 导入模板引擎
const template = require('art-template');
const dateFormat = require('dateFormat')
// 引入path模板
const path = require('path');
// 引入body-paser模板,获取post的请求参数
const bodyParser = require('body-parser');
// 引入config模板
const config = require('config');
// 连接数据库
require('./model/connect');
// 引入数据库用户
const user = require('./model/user');
const { nextTick } = require('process');
// 创建网站服务器
const app = express();
// 处理post 请求参数
app.use(bodyParser.urlencoded({extended: false}));
// session的配置
app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'secret sky',
    cookie: {
		maxAge: 24 * 60 * 60 * 1000
	}
}));
// 告诉express框架所在位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的后缀是什么
app.set('view engine', 'art');
// 当渲染后缀art所使用的模板引擎是什么
app.engine('art', require('express-art-template'));
// 导入模板变量
template.defaults.imports.dateFormat = dateFormat;
// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));
console.log(config.get('title'));
// 获取系统环境变量,返回值为对象
// console.log(process.env);
if (process.env.NODE_ENV == 'development') {
  console.log('当前为开发环境');
} else {
  console.log('当前为生产环境');
}
// 引入路由模板
const home = require('./route/home');
const admin = require('./route/admin');
// 拦截请求判断用户端登录状态
app.use('/admin', require('./middleware/loginGuard'))
// 为路由匹配请求路径
app.use('/home', home)
app.use('/admin', admin)
app.use((err, req, res, next) => {
  // 将对象字符串转换为对象
  const result = JSON.parse(err)
  let params = [];
  for(let k in result) {
    if(k != 'path') {
      params.push(k + '=' + result[k])
    }
  }
  res.redirect(`${result.path}?${params.join('&')}`);
})
// 监听端口
app.listen(80);
console.log('网站服务器启动成功');