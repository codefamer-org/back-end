'use strict';
const uuidv4 = require('uuid/v4')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, ENUM, UUID, NOW } = Sequelize;
    // 创建表
    await queryInterface.createTable('category',
      {
        id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: () => uuidv4().replace(/-/g, ''), comment: '主键 用户唯一ID' },
        label: { type: STRING, comment: '标题' },
        value: { type: STRING, comment: '值' },
        type: { type: STRING, comment: '类型' },
        order: { type: INTEGER, comment: '排序' },
        isDelete: { type: ENUM, values: ['0', '1'], defaultValue: '0', comment: '是否删除 否-0 是-1' },
        createdAt: { type: DATE, defaultValue: NOW, comment: '创建时间' },
        createUserId: { type: STRING, comment: '创建人ID' },
        updatedAt: { type: DATE, defaultValue: NOW, comment: '更新时间' },
        updateUserId: { type: STRING, comment: '更新人ID' },
      }, {
        tableName: 'category', // 自定义的表名，也可以不写，直接用define后面的也可以
        charset: 'utf8',
      });
    await queryInterface.addIndex('category', ['id'], { unique: true, name: 'id' });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('category');
  },
};