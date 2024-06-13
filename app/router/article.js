'use strict';

module.exports = (app) => {
  const { router, controller, middleware } = app;
  const jwt = middleware.verifyToken(app.config.jwt.secret);
  router.resources('article', '/api/article', jwt, controller.article);
};
