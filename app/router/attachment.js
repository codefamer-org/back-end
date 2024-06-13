'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.resources('attachment', '/api/attachment', controller.attachment);
};
