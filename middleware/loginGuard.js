const loginguard = (req, res, next) => {
    // 判断用户是否是登录页面
    // 判断用户是否是登录状态
    // 如果用户是登录的，请求放行
    // 如果用户是未登录的，重新定位到登录页面
    if(req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login')
    } else {
        next();
    }
};
module.exports = loginguard;