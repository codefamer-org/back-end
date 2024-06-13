'use strict';

module.exports = (app) => {
  const { router, controller } = app;
  router.post('/api/sso/login', controller.sso.login);
};
