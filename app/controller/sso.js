'use strict';

const Controller = require('egg').Controller;

class SsoController extends Controller {
  async login() {
    const { ctx, app } = this;
    const { name, password } = ctx.request.body;
    await ctx.model.Sso.sync({ force: true });
    console.log("用户模型表刚刚(重新)创建！");

    // 校验输入参数
    const rules = {
      name: { type: 'string', required: true, desc: '账户不能为空' },
      password: { type: 'string', required: true, desc: '密码不能为空' },
    };
    const errors = app.validator.validate(rules, ctx.request.body);
    if (errors && errors.length) {
      ctx.helper.responseSuccessHelper({ msg: '账户或密码不能为空' });
      return;
    }

    // 执行登录逻辑
    try {
      const usersinfo = await ctx.model.Sso.findOne({
        where: { name, password, is_delete: 0 },
      });
      if (!usersinfo) {
        ctx.helper.responseSuccessHelper({ msg: '用户名或密码错误' });
      } else {
        ctx.helper.responseSuccessHelper({ data: ctx.helper.getToken(usersinfo) });
      }
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: error || '出错了' });
    }
  }
}

module.exports = SsoController;
