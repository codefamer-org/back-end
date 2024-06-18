'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class ArticleController extends Controller {
  async getAll() {
    const { ctx } = this;
    // const Op = this.app.Sequelize.Op;
    try {
      const data = await ctx.model.Article.findAndCountAll({
        attributes: [ 'id', 'title', 'desc' ],
        order: [
          [ 'created_at', 'DESC' ],
        ],
      });
      if (!data) {
        ctx.helper.responseSuccessHelper({ msg: '未获取到数据' });
      } else {
        ctx.helper.responseSuccessHelper({ data });
      }
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: '获取数据出错了' });
    }
  }

  async index() {
    const { ctx } = this;
    const { page, size } = ctx.query;
    // const Op = this.app.Sequelize.Op;
    try {
      const data = await ctx.model.Article.findAndCountAll({
        where: ctx.helper.getWhereSql({ fileds: 'title' }),
        // attributes: [ 'id', 'name', 'sex' ],
        order: [
          [ 'created_at', 'DESC' ],
        ],
        offset: (toInt(page) - 1) * toInt(size), // 每页起始位置
        limit: toInt(size),
      });
      if (!data) {
        ctx.helper.responseSuccessHelper({ msg: '未获取到数据' });
      } else {
        ctx.helper.responseSuccessHelper({ data });
      }
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: '获取数据出错了' });
    }
  }

  async show() {
    const { ctx } = this;
    try {
      const data = await ctx.model.Article.findOne({
        where: { id: ctx.params.id, is_delete: 0 },
      });
      if (!data) {
        ctx.helper.responseSuccessHelper({ msg: '不存在该资源' });
      } else {
        ctx.helper.responseSuccessHelper({ data });
      }
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: '出错了' });
    }
  }

  async create() {
    const { ctx, app } = this;
    const { title, markdown, html, desc } = ctx.request.body;
    // 校验输入参数
    const rules = {
      title: { type: 'string', required: true, desc: '文章标题不能为空' },
      markdown: { type: 'string', required: true, desc: '文章内容不能为空' },
    };
    const errors = app.validator.validate(rules, ctx.request.body);
    if (errors && errors.length) {
      ctx.helper.responseSuccessHelper({ msg: '文章标题或文章内容不能为空' });
      return;
    }
    try {
      await ctx.model.Article.create({ title, markdown, html, desc });
      ctx.helper.responseSuccessHelper({});
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: error || '出错了' });
    }
  }

  async update() {
    const { ctx, app } = this;
    const id = toInt(ctx.params.id);
    const data = await ctx.model.Article.findByPk(id);
    if (!data) {
      ctx.helper.responseSuccessHelper({ msg: '文章不存在' });
      return;
    }
    const { title, markdown, html } = ctx.request.body;
    // 校验输入参数
    const rules = {
      title: { type: 'string', required: true, desc: '文章标题不能为空' },
      markdown: { type: 'string', required: true, desc: '文章内容不能为空' },
    };
    const errors = app.validator.validate(rules, ctx.request.body);
    if (errors && errors.length) {
      ctx.helper.responseSuccessHelper({ msg: '文章标题或文章内容不能为空' });
      return;
    }
    try {
      await data.update({ title, markdown, html });
      ctx.helper.responseSuccessHelper({});
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: error || '出错了' });
    }
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    try {
      const result = await ctx.model.Article.findByPk(id);
      if (!result) {
        ctx.helper.responseSuccessHelper({ msg: '操作失败' });
      } else {
        await result.destroy();
        ctx.helper.responseSuccessHelper({});
      }
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: error || '出错了' });
    }
  }
}

module.exports = ArticleController;
