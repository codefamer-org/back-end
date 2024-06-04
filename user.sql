INSERT INTO `user` (`id`, `name`, `mobile`, `password`, `sex`, `email`, `age`, `avatar`, `is_delete`, `create_time`, `update_time`, `create_user`, `update_user`) VALUES (1, 'admin', '18281089509', 'y6Nb7NAuT+54KrJUfI/0Gw==', '0', NULL, NULL, NULL, '1', '2024-05-30 15:03:34', '2024-05-30 15:03:34', NULL, NULL);




use strict';
const Service = require('egg').Service;
const Op = this.ctx.model.Sequelize.Op;
class UserService extends Service {
asynclist(username,page,limit){
letwhere={}};
if(username!="){
where={
[0p.or]:[{nickname:{[Op.like]:
'%+username+%*}},//like和or连用
{username:{[Op.like]: '%' + username+'%'} },
1,
};
return await this.ctx.model.user.findAndCountAll({
where
offset:(parseInt(params.page)-1)
limit: parseInt(params.limit),
parseInt(params.limit),//每页起始位置
order:[['last login time','DESC']],//排序
include:[//连表查询
C
model: this.ctx.model.Userinfo,
attributes: [['user_level', user_level'],],
module.exports = UserService;
