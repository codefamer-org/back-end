'use strict';

const Controller = require('egg').Controller;
class MyController extends Controller {
  async create() {
    const { ctx, app } = this;
    await ctx.helper.commonValidateParams({ fileds: ['title', 'html', 'markdown'] });
    await ctx.service.article.create();
  }
  async destroy() {
    const { ctx, app } = this;
    await ctx.helper.commonValidateParams({ fileds: ['id'] });
    await ctx.service.article.destroy();
  }
  async update() {
    const { ctx, app } = this;
    await ctx.helper.commonValidateParams({ fileds: ['id'] });
    await ctx.helper.checkFiledsIsExist({ fileds: ['title', 'html', 'markdown'] });
    await ctx.service.article.update();
  }
  async show() {
    const { ctx, app } = this;
    await ctx.helper.commonValidateParams({ fileds: ['id'] });
    await ctx.service.article.show();
  }
  async getAll() {
    const { ctx, app } = this;
    await ctx.service.article.getAll();
  }
}

module.exports = MyController;
