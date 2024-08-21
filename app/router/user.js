'use strict';

module.exports = (app) => {
  const { router, controller, middleware } = app;
  const jwt = middleware.verifyToken(app.config.jwt.secret);
  router.post('/api/user/login', controller.user.login);
  router.post('/api/user/getAll', jwt, controller.user.getAll);
  router.resources('user', '/api/user', jwt, controller.user);
};
