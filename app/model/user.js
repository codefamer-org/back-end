'use strict';
const uuidv4 = require('uuid/v4');

module.exports = app => {
  const { STRING, INTEGER, DATE, ENUM, UUID, NOW } = app.Sequelize;
  const User = app.model.define('user', {
    id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: () => uuidv4().replace(/-/g, '') },
    name: { type: STRING },
    mobile: { type: STRING },
    password: { type: STRING },
    avatar: { type: STRING },
    age: { type: INTEGER },
    email: { type: STRING, validate: { isEmail: true } },
    sex: { type: ENUM, values: ['保密111111111111', '男', '女'], allowNull: false, defaultValue: '保密111111111111' },
    is_delete: { type: ENUM, values: ['0', '1'], allowNull: false, defaultValue: '0' },
    createdAt: { type: DATE, defaultValue: NOW },
    createUser: { type: STRING },
    updatedAt: { type: DATE, defaultValue: NOW },
    updateUser: { type: STRING },
  }, {
    indexes: [{unique: true, fields: ['id', 'email', 'name', 'mobile']}],
    // indexes: [
    //   // {unique: true, fields: ['id', 'email', 'name', 'mobile']}
    //   // { unique: true, fields: ['email'] },  // 唯一索引
    //   // { fields: ['id', 'name', 'mobile', 'email'] }  // 联合索引
    // ],
    tableName: 'user',
  });
  return User;
};