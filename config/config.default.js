'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_{{keys}}';
  config.baseDir = ''
  // add your config here
  config.middleware = [];

  // change to your own sequelize configurations
  config.sequelize = {
    dialect: 'mysql',
    host: '54.210.95.145',
    port: 3306,
    database: 'codefarmer',
    username: 'root',
    password: 'LuJun=940424',
    timezone: '+08:00',
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
    // define: {
    //   // 取消数据表名复数
    //   freezeTableName: true,
    //   // 自动写入时间戳 created_at updated_at
    //   timestamps: true,
    //   // 字段生成软删除时间戳 deleted_at
    //   paranoid: true,
    //   createdAt: 'created_at',
    //   updatedAt: 'updated_at',
    //   deletedAt: 'deleted_at',
    //   // 所有驼峰命名格式化
    //   underscored: true,
    // },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.jwt = {
    secret: 'LuJun=940424',
    enable: true, // default is false
    match: '/jwt', // optional
    // expiresIn: '24h',
    // sign: {
    //   // 多少s后过期。actionToken.js中,jwt.sing(plyload,secret,{expiresIn:number})会被合并，调用时设置优先级更高;
    //   // expiresIn: 8 * (60 * 60),
    // },
  };

  config.multipart = {
    fileExtensions: [ '.apk', '.pptx', '.docx', '.csv', '.doc', '.ppt', '.pdf', '.pages', '.wav', '.mov' ], // 增加对 .apk 扩展名的支持
  },

  // 允许跨域的方法
  config.cors = {
    origin: '*', // 允许所有的请求源
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // 中间件
  config.middleware = [ 'errorHandler' ];
  config.errorHandler = {
    // ceshi: 123,
    // 通用配置（以下是重点）
    enable: true, // 控制中间件是否开启。
    // match:'/news', // 设置只有符合某些规则的请求才会经过这个中间件（匹配路由）
    // ignore:'/shop' // 设置符合某些规则的请求不经过这个中间件。
    /**
      注意：
      1. match 和 ignore 不允许同时配置
      2. 例如：match:'/news'，只要包含/news的任何页面都生效
      **/
    // match 和 ignore 支持多种类型的配置方式：字符串、正则、函数（推荐）
    // match(ctx) {
    //   // 只有 ios 设备才开启
    //   const reg = /iphone|ipad|ipod/i;
    //   return reg.test(ctx.get('user-agent'));
    // },
  };

  return config;
};
