'use strict';

module.exports = (app) => {
  const { router, controller, middleware } = app;
  const jwt = middleware.verifyToken(app.config.jwt.secret);
  router.post('/api/article/getAll', controller.article.getAll);
  router.post('/api/article/:id', controller.article.show);
  router.resources('article', '/api/article', jwt, controller.article);
};
