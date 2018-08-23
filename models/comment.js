'use strict';
// 
module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('comment', {
    content: DataTypes.STRING,
    articleId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    // hooks:{
    //   beforeCreate: function(name, fn) {
    //     name.content = name.content.toLowerCase();
    //     fn(null, name);   // the done function. 
    //   }
    // }
  });

  comment.hook('beforeCreate', (comment, options) => { // es6
    comment.content = comment.content.toLowerCase();
  });


  comment.associate = function(models) {
  	models.comment.belongsTo(models.article);
  	models.comment.belongsTo(models.author);
    // associations can be defined here
  };
  return comment;
};