'use strict';

module.exports = secret => {
  return async function verifyToken(ctx, next) {
    const { method, url } = ctx.request;
    const ingoreTokenApi = [
      '/user/login',
      '/api/user/login',
    ];
    if (ingoreTokenApi.includes(url) && method.toLocaleUpperCase() === 'POST') {
      await next();
    } else {
      // 若是没有 token，返回的是 null 字符串
      const token = ctx.request.header.authorization;
      if (token !== 'null' && token) {
      // 有 token 需要校验
        try {
          await ctx.app.jwt.verify(token, secret);
          await next();
        } catch (error) {
          console.log('error', error);
          ctx.helper.responseSuccessHelper({ msg: 'token已过期，请重新登录', code: 401 });
          // ctx.status = 200;
        }
      } else {
        // token 不存在
        // ctx.status = 200;
        ctx.helper.responseSuccessHelper({ msg: 'token不存在', code: 401 });
      }
    }
  };
};
