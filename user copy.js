'use strict';

const Controller = require('egg').Controller;
class UserController extends Controller {
  async create() {
    const { ctx } = this;
    // commonValidateParams 是一个帮助函数，用于验证特定字段是否已填写
    // 如果验证失败，commonValidateParams 函数会抛出异常
    // 如果验证成功，则继续执行业务逻辑
    await ctx.helper.commonValidateParams({ fileds: ['name', 'mobile', 'password', 'email'] });
    try {
      const [data, isNew] = await ctx.service.user.create();
      if (!isNew) {
        ctx.helper.responseSuccessHelper({ msg: '数据已存在' });
        return;
      }
      ctx.helper.responseSuccessHelper({ data });
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: error || '出错了' });
    }
  }
  async login() {
    const { ctx, app } = this;
    await ctx.helper.commonValidateParams({ fileds: ['name', 'password'], ctx });
    try {
      const data = await ctx.service.user.login();
      if (data) {
        ctx.helper.responseSuccessHelper({ data });
      } else {
        ctx.helper.responseSuccessHelper({ msg: '用户名或密码错误' });
      }
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: error || '出错了' });
    }


    const { name, password } = ctx.request.body;
    await ctx.helper.commonValidateParams({ fileds: ['name', 'password'], ctx });
    try {
      const usersinfo = await ctx.model.User.findOne({
        where: { name, password, is_delete: ['0', 0] },
        // attributes: [[literal('COUNT(*) + 1'), 'customCount']] literal 自定义聚合函数或任何其他数据库原生函数
        // attributes: [[col('price'), 'productPrice']], col('*')
        // attributes: { include: ['name'], exclude: ['age'] },
        // attributes: [[sequelize.fn('SUM', sequelize.col('quantity')), 'totalQuantity']],
        // order: [['field1', 'ASC'], ['field2', 'DESC']],
        // order: [['fieldName', 'ASC']],
        // order: [['RelatedModel', 'fieldName', 'ASC']],
        // group: ['age']
        // distinct: true
        // console.log('查询到的记录:', record.get({ plain: true }));
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


  async update() {
    const ctx = this.ctx;
    const id = ctx.helper.toInt(ctx.params.id);
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
    const id = ctx.helper.toInt(ctx.params.id);
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
