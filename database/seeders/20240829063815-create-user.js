'use strict';
const uuidv4 = require('uuid/v4');

module.exports = {
  up: (queryInterface, Sequelize) => {
    // 默认插入一条管理员数据
    return queryInterface.bulkInsert('user', [{
      id: uuidv4().replace(/-/g, ''), // f7cc9bb571f54efc900f10efa134e615
      name: 'admin',
      mobile: 18281089509,
      password: 'y6Nb7NAuT+54KrJUfI/0Gw==',
      email: '861479734@qq.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
