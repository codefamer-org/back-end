'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.resources('article', '/api/article', controller.article);
};
