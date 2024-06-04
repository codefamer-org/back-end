
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