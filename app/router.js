'use strict';

module.exports = async app => {
  require('./router/common')(app);
  require('./router/sso')(app);
  require('./router/attachment')(app);
  require('./router/user')(app);
  require('./router/article')(app);
  require('./router/category')(app);
};
