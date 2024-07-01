'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE } = Sequelize;
    await queryInterface.createTable('userfollows', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      user_id: {
        type: INTEGER,
        allowNull: false,
        comment: '用户的 id',
      },
      follower_id: {
        type: INTEGER,
        allowNull: false,
        comment: '被关注用户的 id',
        // 外键 用户表ID
        // references: {
        //   model: 'user',
        //   key: 'id',
        // },
      },
      created_at: DATE,
      updated_at: DATE,
      deleted_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('userfollows');
  },
};
