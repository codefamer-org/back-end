'use strict';

const Controller = require('egg').Controller;

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController extends Controller {

  async login() {
    const { ctx, app } = this;
    const { name, password } = ctx.request.body;
    await ctx.helper.commonValidateParams({ fileds: ['name', 'password'], ctx });
    try {
      const usersinfo = await ctx.model.User.findOne({
        where: { name, password, is_delete: ['0', 0] },
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

  async index() {
    const { ctx } = this;
    const { name, mobile, email, limit, offset } = ctx.query;
    const Op = this.app.Sequelize.Op;
    try {
      const data = await ctx.model.User.findAll({
        // where: {
        //   name: {
        //     [Op.like]: '%' + name || null + '%',
        //   },
        //   mobile: {
        //     [Op.like]: '%' + mobile || null + '%',
        //   },
        //   email: {
        //     [Op.like]: '%' + email || null + '%',
        //   },
        // },
        // attributes: [ 'id', 'name', 'sex' ],
        order: [
          [ 'created_at', 'DESC' ],
        ],
        offset:(parseInt(offset)-1) * parseInt(limit),//每页起始位置
        limit: parseInt(limit),
        // limit: toInt(ctx.query.limit),
        // offset: toInt(ctx.query.offset),
      });
      if (!data) {
        ctx.helper.responseSuccessHelper({ msg: '未获取到数据' });
      } else {
        ctx.helper.responseSuccessHelper({ data: data.toJSON() });
      }
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: '获取数据出错了' });
    }

  }

  async show() {
    const { ctx } = this;
    try {
      const data = await ctx.model.User.findOne({
        where: { id: ctx.params.id, is_delete: 0 },
      });
      if (!data) {
        ctx.helper.responseSuccessHelper({ msg: '用户不存在' });
      } else {
        ctx.helper.responseSuccessHelper({ data });
      }
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: '获取用户详情出错了' });
    }
  }

  async create() {
    const { ctx, app } = this;
    await ctx.helper.commonValidateParams({ fileds: ['name'] });
    try {
      const [data, isNew] = await ctx.model.User.findOrCreate({
        where: { name: ctx.request.body.name },
        defaults: { ...ctx.request.body }
      });
      if (!isNew) {
        ctx.helper.responseSuccessHelper({ msg: '数据已存在' });
        return;
      }
      ctx.helper.responseSuccessHelper({ data });
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: error || '出错了' });
    }
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { name, age } = ctx.request.body;
    await user.update({ name, age });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = UserController;
