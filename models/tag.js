'use strict';
module.exports = (sequelize, DataTypes) => {
  var tag = sequelize.define('tag', {
    name: DataTypes.STRING
  }, {});
  tag.associate = function(models) {
    models.tag.belongsToMany(models.article, {through: 'articleTags'}); //
    // associations can be defined here
  };
  return tag;
};


// is hasMany usable instead of belongsToMany? 
// Can you use through?