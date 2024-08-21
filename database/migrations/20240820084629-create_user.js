'use strict';
const uuidv4 = require('uuid/v4')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, ENUM, UUID, NOW } = Sequelize;
    // 创建表
    await queryInterface.createTable('user',
      {
        id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: () => uuidv4().replace(/-/g, ''), comment: '主键 用户唯一ID' },
        name: { type: STRING, comment: '用户名' },
        mobile: { type: STRING, comment: '手机号' },
        password: { type: STRING, comment: '密码' },
        avatar: { type: STRING, comment: '头像' },
        age: { type: INTEGER, comment: '年龄' },
        email: { type: STRING, validate: { isEmail: true }, comment: '邮箱' },
        sex: { type: ENUM, values: ['0', '1', '2'], defaultValue: '0', comment: '性别 保密-0 男-1 女-2  默认0保密' },
        isDelete: { type: ENUM, values: ['0', '1'], defaultValue: '0', comment: '是否删除 否-0 是-1' },
        createdAt: { type: DATE, defaultValue: NOW, comment: '创建时间' },
        // createUser: { type: STRING, comment: '创建人' },
        createUserId: { type: STRING, comment: '创建人ID' },
        updatedAt: { type: DATE, defaultValue: NOW, comment: '更新时间' },
        // updateUser: { type: STRING, comment: '更新人' },
        updateUserId: { type: STRING, comment: '更新人ID' },
      }, {
        tableName: 'user', // 自定义的表名，也可以不写，直接用define后面的也可以
        charset: 'utf8',
      });
    // await queryInterface.addIndex('user', ['id', 'name', 'mobile', 'email'], { unique: true });
    await queryInterface.addIndex('user', ['id'], { unique: true, name: 'id' });
    // await queryInterface.addIndex('user', ['name'], { unique: true });
    await queryInterface.addIndex('user', ['mobile'], { unique: true, name: 'mobile' });
    await queryInterface.addIndex('user', ['email'], { unique: true, name: 'email' });
    // await queryInterface.removeIndex('user', 'name');
  },
  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};