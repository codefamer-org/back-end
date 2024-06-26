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
  async commonValidateParams({ fileds }) {
    if (!Array.isArray(fileds)) {
      fileds = [ fileds ];
    }
    const rules = {};
    fileds?.forEach(item => {
      rules[item] = {
        type: 'string',
        required: true,
        desc: `【${item}】 参数不能为空`
      }
    })
    const errors = await this.app.validator.validate(rules, this.ctx.request.body);
    if (errors && errors.length) {
      return Promise.reject({ msg: '参数有误', status: 200 })
    } else {
      return Promise.resolve()
    }
  },
  getToken(info) {
    const { app } = this;
    const { name, mobile, password, email, user_id, id } = info || {};
    return app.jwt.sign({name, mobile, password, email, user_id, id}, app.config.jwt.secret);
  },
  toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
  },
  getWhereSql({ fileds, queryFileds }) {
    if (!Array.isArray(fileds)) {
      fileds = [ fileds ];
    }
    if (!Array.isArray(queryFileds)) {
      queryFileds = [ queryFileds ];
    }
    let where = { is_delete: ["0", 0] };
    const orSql = [];
    const { app, ctx } = this;
    const Op = app.Sequelize.Op;
    const params = { ...ctx.request.body, ...ctx.params, ...ctx.query };
    const inSql = []
    fileds.forEach(element => {
      if (params[element]) {
        if (Array.isArray(params[element])) {
          inSql.push({ [element]: { [Op.in]: params[element] } });
        } else {
          orSql.push({ [element]: { [Op.like]: '%' + params[element] + '%' } });
        }
      }
    });

    queryFileds.forEach(element => {
      if (params[element]) {
        where[element] = params[element]
      }
    })

    if (orSql.length) {
      where = {
        ...where,
        [Op.or]: orSql,
      };
    }
    if (inSql.length) {
      where = {
        ...where,
        [Op.or]: inSql,
      };
    }
    return where;
  },
};
// ctx.helper.responseSuccessHelper({ data = null, msg = null, code = 200 });
// ctx.helper.responseErrorHelper({ data = null, msg = null, code = 200 });
