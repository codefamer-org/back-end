const Service = require('egg').Service

class MyService extends Service {
  async login() {
    const { ctx, app } = this;
    try {
      const data = await ctx.model.User.findOne({
        where: { name: ctx.request.body.name, password: ctx.request.body.password, isDelete: ['0'] },
      });
      if (data) {
        ctx.helper.responseSuccessHelper({ data: ctx.helper.getToken(data) });
      } else {
        ctx.helper.responseSuccessHelper({ msg: '未查询到数据' });
      }
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: error || '出错了' });
    }
  }
  async create() {
    const { ctx, app } = this;
    const extParams = { createUserId: app.userInfo?.id }
    try {
      const [data, isNew] = await ctx.model.User.findOrCreate({
        where: {
          mobile: ctx.request.body.mobile,
          name: ctx.request.body.name,
          email: ctx.request.body.email,
        },
        defaults: { ...ctx.request.body, ...extParams }
      });
      if (!isNew) {
        ctx.helper.responseSuccessHelper({ msg: '数据已存在' });
        return;
      }
      ctx.helper.responseSuccessHelper({ data });
    } catch (error) {
      ctx.helper.handleError(error);
      // ctx.helper.responseErrorHelper({ msg: error || '出错了' });
    }
  }
  async destroy() {
    const { ctx, app } = this;
    try {
      const data = await ctx.model.User.findByPk(ctx.params.id);
      if (data) {
        const { force = false } = ctx.query;
        if (force) {
          await data.destroy();
        } else {
          await data.update({ isDelete: '1' });
        }
        ctx.helper.responseSuccessHelper({ data: '操作成功' });
      } else {
        ctx.helper.responseErrorHelper({ msg: '操作失败' });
      }
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: error || '出错了' });
    }
  }
  async update() {
    const { ctx, app } = this;
    const extParams = { updateUserId: app.userInfo?.id }
    try {
      const data = await ctx.model.User.update({ ...ctx.request.body, ...extParams }, { where: { id: ctx.params.id } });
      if (data?.[0] > 0) {
        ctx.helper.responseSuccessHelper({ data: '操作成功' });
      } else {
        ctx.helper.responseErrorHelper({ msg: '操作失败' });
      }
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: error || '出错了' });
    }
  }
  async show() {
    const { ctx, app } = this;
    try {
      const data = await ctx.model.User.findOne({
        where: { id: ctx.params.id, isDelete: ['0'] },
      });
      if (data) {
        ctx.helper.responseSuccessHelper({ data });
      } else {
        ctx.helper.responseSuccessHelper({ msg: '未查询到数据' });
      }
    } catch (error) {
      ctx.helper.responseErrorHelper({ msg: error || '出错了' });
    }
  }
  async getAll() {
    const { ctx, app } = this;
    const { page , size } = ctx.query;
    const isPagination = page && size ? true : false;
    const sequelizeAPI = isPagination ? 'findAndCountAll' : 'findAll';
    try {
      const data = await ctx.model.User[sequelizeAPI]({
        where: { ...ctx.helper.getWhereSql({ fileds: ['name', 'mobile', 'email']}) },
        // attributes: [ 'id', 'name', 'sex' ],
        attributes: {
          exclude: ['password'],
          include: []
        },
        order: [
          [ 'createdAt', 'DESC' ],
        ],
        ...ctx.helper.getPagination(),
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
}

module.exports = MyService