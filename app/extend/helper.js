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
  handleError(error) {
    // 命中索引
    if (error?.name === 'SequelizeUniqueConstraintError') {
      // const errors = error?.errors?.map((item) => item.message)?.join(',')
      // 处理唯一约束错误
      let errorMessage = 'Duplicate value found for unique constraint.';
      // 根据错误信息获取具体违反的唯一键
      if (error?.errors && error?.errors?.length > 0) {
        errorMessage = `Duplicate value found for field: ${error?.errors?.[0]?.path}`;
      }
      return this.responseErrorHelper({ msg: errorMessage });
    } else {
      return this.responseErrorHelper({ msg: error || '出错了' });
    }
  },
  async checkFiledsIsExist({ fileds }) {
    if (!Array.isArray(fileds)) {
      fileds = [ fileds ];
    }
    const body = this.ctx.request.body || {};
    const bodyFileds = Object.keys(body)?.map(item => item);
    if (fileds?.some(item => bodyFileds?.includes(item) && body[item])) {
      return Promise.resolve()
    } else {
      return Promise.reject({ msg: '参数有误', status: 200 })
    }
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
    let msg = '参数有误';
    const errors = await this.app.validator.validate(rules, { ...this.ctx.request.body, ...this.ctx.params });
    const missingFields = errors?.filter((item) => ['missing_field']?.includes(item.code));
    const missingFieldsDesc = missingFields?.map(item => item.field)?.join(',');
    if (missingFields?.length) {
      msg = `${msg}: 缺少必填字段【${missingFieldsDesc}】`
    }
    if (errors && errors.length) {
      return Promise.reject({ msg, status: 200 })
    } else {
      return Promise.resolve()
    }
  },
  injectAppGlobalData(key, value){
    const { app } = this;
    if (key) {
      app[key] = value;
    }
  },
  getPagination(){
    const { app, ctx, toInt } = this;
    const { page , size } = ctx.query;
    if(page && size) {
      return {
        offset: (toInt(page) - 1) * toInt(size), // 每页起始位置
        limit: toInt(size),
      }
    }
    return {}
  },
  getToken(info) {
    const { app } = this;
    const { name, mobile, email, id } = info || {};
    return app.jwt.sign({name, mobile, email, id}, app.config.jwt.secret);
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
    // let where = { isDelete: ["0", 0] };
    let where = { isDelete: "0" };
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
