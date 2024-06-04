'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/api/user/login', controller.user.login);
  router.resources('user', '/api/user', controller.user);
};
