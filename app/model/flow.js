'use strict';
module.exports = (sequelize, DataTypes) => {
  const flow = sequelize.define('flow', {
    name: DataTypes.STRING
  }, {});
  flow.associate = function(models) {
    // associations can be defined here
  };
  return flow;
};