'use strict';

module.exports = (app) => {
  const { router, controller, middleware } = app;
  const jwt = middleware.verifyToken(app.config.jwt.secret);
  // router.get('/api/article/:id', controller.article.show);
  router.post('/api/article/getAll', controller.article.getAll);
  router.resources('article', '/api/article', jwt, controller.article);
};
