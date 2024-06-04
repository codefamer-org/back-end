'use strict';

// exports.sequelize = {
//   enable: true,
//   package: 'egg-sequelize',
// };

// exports.validate = {
//   enable: true,
//   package: 'egg-validate',
// };

module.exports = {
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};
