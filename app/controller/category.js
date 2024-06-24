'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class CategoryController extends Controller {
  async getAll() {
    const { ctx } = this;
    // const Op = this.app.Sequelize.Op;
    try {
      const data = await ctx.model.Category.findAndCountAll({
        where: ctx.helper.getWhereSql({ fileds: ['label', 'type'] }),
        attributes: [ 'label', 'value', 'type' ],
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
      const data = await ctx.model.Category.findAndCountAll({
        where: ctx.helper.getWhereSql({ fileds: ['label', 'type'] }),
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
      const data = await ctx.model.Category.findOne({
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
    const { label, value, type } = ctx.request.body;
    // 校验输入参数
    const rules = {
      label: { type: 'string', required: true, desc: '名称不能为空' },
      value: { type: 'string', required: true, desc: '值不能为空' },
      type: { type: 'string', required: true, desc: '类型不能为空' },
    };
    const errors = app.validator.validate(rules, ctx.request.body);
    if (errors && errors.length) {
      ctx.helper.responseSuccessHelper({ msg: '参数校验失败' });
      return;
    }
    try {
      await ctx.model.Category.create({ label, value, type });
      ctx.helper.responseSuccessHelper({});
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: error || '出错了' });
    }
  }

  async update() {
    const { ctx, app } = this;
    const id = toInt(ctx.params.id);
    const data = await ctx.model.Category.findByPk(id);
    if (!data) {
      ctx.helper.responseSuccessHelper({ msg: '数据不存在' });
      return;
    }
    const { label, value, type } = ctx.request.body;
    // 校验输入参数
    const rules = {
      label: { type: 'string', required: true, desc: '名称不能为空' },
      value: { type: 'string', required: true, desc: '值不能为空' },
      type: { type: 'string', required: true, desc: '类型不能为空' },
    };
    const errors = app.validator.validate(rules, ctx.request.body);
    if (errors && errors.length) {
      ctx.helper.responseSuccessHelper({ msg: '参数校验失败' });
      return;
    }
    try {
      await data.update({ label, value, type });
      ctx.helper.responseSuccessHelper({});
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: error || '出错了' });
    }
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    try {
      const result = await ctx.model.Category.findByPk(id);
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

module.exports = CategoryController;
