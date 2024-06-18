'use strict';

module.exports = {
  responseSuccessHelper({ data = null, msg = null, code = 200 }) {
    this.ctx.body = { data, msg, code };
    this.ctx.status = 200;
  },
  responseErrorHelper({ data = null, msg = '出错了', code = 500 }) {
    this.ctx.body = { data, msg, code };
    this.ctx.status = 200;
  },
  getToken(info) {
    const { app } = this;
    const { name, mobile, password, email, user_id, id } = info || {};
    return app.jwt.sign({name, mobile, password, email, user_id, id}, app.config.jwt.secret);
  },
  getWhereSql({ fileds }) {
    if (!Array.isArray(fileds)) {
      fileds = [ fileds ];
    }
    let where = { is_delete: 0 };
    const orSql = [];
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    const params = { ...ctx.request.body, ...ctx.params, ...ctx.query };
    fileds.forEach(element => {
      if (params[element]) {
        orSql.push({ [element]: { [Op.like]: '%' + params[element] + '%' } });
      }
    });
    if (orSql.length) {
      where = {
        ...where,
        [Op.or]: orSql,
      };
    }
    return where;
  },
};
// ctx.helper.responseSuccessHelper({ data = null, msg = null, code = 200 });
// ctx.helper.responseErrorHelper({ data = null, msg = null, code = 200 });
