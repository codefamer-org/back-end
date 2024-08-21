'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;
  const jwt = middleware.verifyToken(app.config.jwt.secret);
  router.post('/api/common/getQiNiuToken', jwt, controller.common.getQiNiuToken);
};
