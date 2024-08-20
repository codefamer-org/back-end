'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.alterColumn('user', 'user_id', {
        comment: 'The user\'s name.'  // 添加字段注释
      });
      console.log('alterColumn不支持');
    } catch (error) {
      console.log('alterColumn不支持, 兼容逻辑');
      await queryInterface.removeColumn('user', 'user_id');
      await queryInterface.addColumn('user', 'user_id', {
        comment: 'The user\'s name.',  // 添加字段注释
        type: Sequelize.INTEGER
      });
    }
  },
  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.alterColumn('user', 'user_id', {
        comment: null
      });
      console.log('alterColumn不支持');
    } catch (error) {
      console.log('alterColumn不支持, 兼容逻辑');
      await queryInterface.removeColumn('user', 'user_id');
      await queryInterface.addColumn('user', 'user_id', {
        comment: null,
        type: Sequelize.INTEGER
      });
    }
  }
};

