'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Attachment = app.model.define('attachment', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    extname: { type: STRING(255), default: null },
    url: STRING(255),
    filename: STRING(255),
    extra: STRING(255),
    is_delete: INTEGER,
    create_user: STRING(255),
    update_user: STRING(255),
    uuid: STRING(255),
    created_at: DATE,
    updated_at: DATE,
  }, {
    timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
    // 使用自定义表名之后上面写的users就直接就是你的表名，如果不加的话，你就可以写user，但是自己的表名为users，程序会自动将s加上
    // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
    // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
    freezeTableName: true,
    // timestamps: false, // 去除createAt updateAt
    // createdAt: false, // 表示不启用created_at
    // updatedAt: false, // 表示不启用updated_at
    tableName: 'attachment', // 自定义的表名，也可以不写，直接用define后面的也可以
    // 只要你使用了freezeTableName，程序就不会自动给你加上s了
  });

  return Attachment;
};
