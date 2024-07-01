'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DATE, ENUM, UUID, UUIDV4} = Sequelize;
    // 创建表
    await queryInterface.createTable('user',
      {
        id: {
          type: UUID,
          // type: STRING(255),
          primaryKey: true,
          unique: true,
          // autoIncrement: true,
          allowNull: false,
          // default: UUIDV4,
          defaultValue: () => {
            return uuidv4().replace(/-/g, '');
          },
          comment: '主键 用户唯一ID',
        },
        name: {
          type: STRING(255),
          comment: '用户名',
          unique: true,
        },
        mobile: {
          type: STRING(255),
          comment: '手机号',
          unique: true,
        },
        email: {
          type: STRING(255),
          comment: '邮箱',
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        password: {
          type: STRING(255),
          comment: '密码'
        },
        avatar: {
          type: STRING(255),
          comment: '头像'
        },
        age: {
          type: INTEGER,
          comment: '年龄'
        },
        sex: {
          type: ENUM,
          values: ['保密', '男', '女'],
          allowNull: false,
          defaultValue: '保密',
          comment: '性别'
        },
        is_delete: {
          type: ENUM,
          values: ['0', '1'],
          allowNull: false,
          defaultValue: '0',
          comment: '是否删除',
          get() {
            const is_delete = this.getDataValue('is_delete');
            // 'this' 允许你访问实例的属性
            return Number(is_delete);
          },
          set() {
            this.setDataValue('is_delete', Number(is_delete))
          },
        },
        created_at: {
          type: DATE,
          comment: '创建时间'
        },
        create_user: {
          type: STRING(255),
          comment: '创建人'
        },
        updated_at: {
          type: DATE,
          comment: '更新时间'
        },
        update_user: {
          type: STRING(255),
          comment: '更新人'
        },
      }, {
        // indexes: [{unique: true, fields: ['id']}],
        timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
        // 使用自定义表名之后上面写的users就直接就是你的表名，如果不加的话，你就可以写user，但是自己的表名为users，程序会自动将s加上
        // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
        // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
        freezeTableName: true,
        // timestamps: false, // 去除createAt updateAt
        // createdAt: false, // 表示不启用created_at
        // updatedAt: false, // 表示不启用updated_at
        tableName: 'user', // 自定义的表名，也可以不写，直接用define后面的也可以
        // 只要你使用了freezeTableName，程序就不会自动给你加上s了
        charset: 'utf8',
      });
    // 建立一对多关联
    // User.hasMany(Post, { foreignKey: 'user_id' });
    // Post.belongsTo(User, { foreignKey: 'user_id' });

    // 添加索引
    // queryInterface.addIndex('tabelName', [ '列名' ]);
      // 外键约束
    // queryInterface.addConstraint('tableName', ['user_id'], {
    //     type: 'foreign key',
    //     name: 'user_id',
    //     references: { //Required field
    //         table: 'users',
    //         field: 'id'
    //     },
    //     onDelete: 'cascade',
    //     onUpdate: 'cascade'
    // });
  },
  down: async queryInterface => {
    await queryInterface.dropTable('user');
  },
};
