'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;
  const jwt = middleware.verifyToken(app.config.jwt.secret);
  router.post('/api/category/getAll', controller.category.getAll);
  router.resources('category', '/api/category', jwt, controller.category);
};
