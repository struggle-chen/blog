const joi = require('joi');
// 引入bcrypt模板进行密码加密
const bcrypt = require('bcrypt');
const { user, validata } = require('../../model/user');
module.exports = async(req, res) => {
    // res.send(req.body)
    
    try{
        validata(req.body)
    } catch(e) {
        // console.log(e.message);
        return res.redirect('/admin/user-edit?message=' + e.message);
    }
    const email = await user.findOne({email: req.body.email});
    if(email) {
        return res.redirect('/admin/user-edit?message=' + '邮箱已存在');
    }
    //对密码进行加密
    const salt = await bcrypt.genSalt(10);
    const result = await bcrypt.hash(req.body.password, salt);  
    console.log(result);
    req.body.password = result;
    const users = await user.create(req.body);
    res.redirect('/admin/user'); 
}