'use strict';

const uuidv4 = require('uuid/v4');
module.exports = app => {
  const { STRING, INTEGER, DATE, UUID, ENUM, NOW } = app.Sequelize;

  const Model = app.model.define('article', {
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
    tableName: 'article',
    indexes: [
      { unique: true, fields: ['id'] },  // 唯一索引
    ],
  });
  // Article.associate = function () {
    // 与用户是 多对一
    // app.model.Article.belongsTo(app.model.User, {
    //   foreignKey: 'create_user_id',
    //   targetKey: 'id',
    //   as: 'create_user_info',
    // });
    // app.model.Article.belongsTo(app.model.User, {
    //   foreignKey: 'update_user_id',
    //   targetKey: 'id',
    //   as: 'update_user_info',
    // });
    // // 与任务是 一对多
    // app.model.Apps.hasMany(app.model.Tasks, {
    //   foreignKey: 'appId',
    // });
    // // 与群组是 多对多
    // app.model.Apps.belongsToMany(app.model.Groups, {
    //   through: app.model.GroupApp,
    //   foreignKey: 'appId',
    //   otherKey: 'groupId'
    // });
  // };
  return Model;
};
