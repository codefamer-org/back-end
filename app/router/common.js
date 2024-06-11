'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.post('/api/common/getQiNiuToken', controller.common.getQiNiuToken);
};
