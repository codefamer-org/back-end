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
    return app.jwt.sign(info, app.config.jwt.secret);
  },
};
// ctx.helper.responseSuccessHelper({ data = null, msg = null, code = 200 });
// ctx.helper.responseErrorHelper({ data = null, msg = null, code = 200 });
