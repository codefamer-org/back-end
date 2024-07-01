
### 初始化 migrations 配置文件和目录
```js
  npx sequelize init:config
  npx sequelize init:migrations
  npx sequelize migration:generate --name=user
```

### 创建数据库
```js
  npx sequelize db:create #配置前使用的命令执行迁移
  // npx sequelize db:migrate #配置前使用的命令执行迁移
  npm run sequelize-cli-ts db:migrate #配置后使用的命令执行迁移
```




// 修改已有字段的数据类型和属性
await sequelize.queryInterface.changeColumn('User', 'age', {
  type: Sequelize.STRING,
  allowNull: true,
});

// 删除已有字段
await sequelize.queryInterface.removeColumn('User', 'age');

// 新增字段
await sequelize.queryInterface.addColumn('User', 'gender', {
  type: Sequelize.STRING,
  allowNull: true,
});

// 手动同步模型和数据库表
await sequelize.sync();

// 删除模型
await User.drop();