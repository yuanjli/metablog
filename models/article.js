'use strict';
module.exports = (sequelize, DataTypes) => {
  var article = sequelize.define('article', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    authorId: DataTypes.INTEGER
  }, {});
  article.associate = function(models) {
  	models.article.belongsTo(models.author);
  	models.article.hasMany(models.comment);
    models.article.belongsToMany(models.tag, {through: 'articleTags'}); // the table that holds the both ids 
    // associations can be defined here
  };
  return article;
};