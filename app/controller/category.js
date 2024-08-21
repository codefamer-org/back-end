'use strict';

const Controller = require('egg').Controller;
class MyController extends Controller {
  async create() {
    const { ctx, app } = this;
    await ctx.helper.commonValidateParams({ fileds: ['label', 'value', 'type'] });
    await ctx.service.category.create();
  }
  async destroy() {
    const { ctx, app } = this;
    await ctx.helper.commonValidateParams({ fileds: ['id'] });
    await ctx.service.category.destroy();
  }
  async update() {
    const { ctx, app } = this;
    await ctx.helper.commonValidateParams({ fileds: ['id'] });
    await ctx.helper.checkFiledsIsExist({ fileds: ['label', 'value', 'type'] });
    await ctx.service.category.update();
  }
  async show() {
    const { ctx, app } = this;
    await ctx.helper.commonValidateParams({ fileds: ['id'] });
    await ctx.service.category.show();
  }
  async getAll() {
    const { ctx, app } = this;
    await ctx.service.category.getAll();
  }
}

module.exports = MyController;
