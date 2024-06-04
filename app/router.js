'use strict';

module.exports = async app => {
  const { middleware } = app;
  // 传入加密字符串
  await middleware.verifyToken(app.config.jwt.secret);
  require('./router/user')(app);
};
