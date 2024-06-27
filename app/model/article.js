'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, UUID } = app.Sequelize;

  const Article = app.model.define('article', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING,
    html: STRING,
    markdown: STRING,
    category: {
      type: STRING,
      // allowNull: true,
      // get(){
      //   return this.getDataValue('category')?.split(',') || null;
      // },
      // set(value){
      //   return this.setDataValue('category', value?.join(',') || null)
      // }
    },
    desc: STRING,
    create_user: STRING(255),
    update_user: STRING(255),
    is_delete: INTEGER,
    created_at: DATE,
    updated_at: DATE,
    user_id: {
      type: UUID,
      references: {
        model: 'User', // 引用的目标模型
        key: 'id', // 引用的目标属性
      },
    },
  }, {
    timestamps: true, // 自动维护时间戳 [ created_at、updated_at ]
    // 使用自定义表名之后上面写的users就直接就是你的表名，如果不加的话，你就可以写user，但是自己的表名为users，程序会自动将s加上
    // 禁止修改表名，默认情况下，sequelize将自动将所有传递的模型名称（define的第一个参数）转换为复数
    // 但是为了安全着想，复数的转换可能会发生变化，所以禁止该行为
    freezeTableName: true,
    // timestamps: false, // 去除createAt updateAt
    // createdAt: false, // 表示不启用created_at
    // updatedAt: false, // 表示不启用updated_at
    tableName: 'article', // 自定义的表名，也可以不写，直接用define后面的也可以
    // 只要你使用了freezeTableName，程序就不会自动给你加上s了
  });

  return Article;
};
