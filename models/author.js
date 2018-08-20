'use strict';
module.exports = (sequelize, DataTypes) => {
  var author = sequelize.define('author', {
    name: DataTypes.STRING,
    bio: DataTypes.TEXT,
    image: DataTypes.STRING
  }, {});
  author.associate = function(models) {
    // associations can be defined here
    models.author.hasMany(models.article); // The model author will have an article
    models.author.hasMany(models.comment);

  };
  return author;
};