'use strict';

module.exports = secret => {
  return async function verifyToken(ctx, next) {
    // 若是没有 token，返回的是 null 字符串
    const token = ctx.request.header.authorization;
    if (token !== 'null' && token) {
      try {
        const data = await ctx.app.jwt.verify(token, secret);
        ctx.helper.injectAppGlobalData('userInfo', data);
      } catch (error) {
        await ctx.helper.responseSuccessHelper({ msg: 'token已过期，请重新登录', code: 401 });
      }
      await next();
    } else {
      await ctx.helper.responseSuccessHelper({ msg: 'token不存在', code: 401 });
    }
  };
};
