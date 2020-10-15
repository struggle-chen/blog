const {user} = require('../../model/user')
module.exports = async(req, res) => {
  const id = req.query.id;
//   res.send('ok')
  await user.findOneAndDelete({_id: id});
//   重新定位到user页面
  res.redirect('/admin/user');
}