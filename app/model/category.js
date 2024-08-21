'use strict';

const uuidv4 = require('uuid/v4');
module.exports = app => {
  const { STRING, INTEGER, DATE, UUID, ENUM, NOW } = app.Sequelize;
  const Model = app.model.define('category', {
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
    tableName: 'category',
    indexes: [
      { unique: true, fields: ['id'] },  // 唯一索引
    ],
  });
  return Model;
};
