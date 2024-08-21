'use strict';

const Controller = require('egg').Controller;
class MyController extends Controller {
  async login() {
    const { ctx, app } = this;
    await ctx.helper.commonValidateParams({ fileds: ['name', 'password'] });
    await ctx.service.user.login();
  }
  async create() {
    const { ctx, app } = this;
    await ctx.helper.commonValidateParams({ fileds: ['name', 'mobile', 'password', 'email'] });
    await ctx.service.user.create();
  }
  async destroy() {
    const { ctx, app } = this;
    await ctx.helper.commonValidateParams({ fileds: ['id'] });
    await ctx.service.user.destroy();
  }
  async update() {
    const { ctx, app } = this;
    await ctx.helper.commonValidateParams({ fileds: ['id'] });
    await ctx.helper.checkFiledsIsExist({ fileds: ['name', 'mobile', 'password', 'email'] });
    await ctx.service.user.update();
  }
  async show() {
    const { ctx, app } = this;
    await ctx.helper.commonValidateParams({ fileds: ['id'] });
    await ctx.service.user.show();
  }
  async getAll() {
    const { ctx, app } = this;
    await ctx.service.user.getAll();
  }
}

module.exports = MyController;
