'use strict';
const uuidv4 = require('uuid/v4')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, ENUM, UUID, NOW } = Sequelize;
    // 创建表
    await queryInterface.createTable('article',
      {
        id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: () => uuidv4().replace(/-/g, ''), comment: '主键 用户唯一ID' },
        title: { type: STRING, comment: '标题' },
        html: { type: STRING, comment: 'html字符串' },
        markdown: { type: STRING, comment: 'markdown字符串' },
        category: { type: STRING, comment: '类别' },
        desc: { type: STRING, comment: '描述' },
        picture: { type: STRING, comment: '封面图' },
        order: { type: INTEGER, comment: '排序' },
        isDelete: { type: ENUM, values: ['0', '1'], defaultValue: '0', comment: '是否删除 否-0 是-1' },
        createdAt: { type: DATE, defaultValue: NOW, comment: '创建时间' },
        createUserId: { type: STRING, comment: '创建人ID' },
        updatedAt: { type: DATE, defaultValue: NOW, comment: '更新时间' },
        updateUserId: { type: STRING, comment: '更新人ID' },
      }, {
        tableName: 'article', // 自定义的表名，也可以不写，直接用define后面的也可以
        charset: 'utf8',
      });
    await queryInterface.addIndex('article', ['id'], { unique: true, name: 'id' });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('article');
  },
};