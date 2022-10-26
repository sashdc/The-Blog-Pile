const Comment = require("./Comment");
const Post = require("./Post");
const User = require("./User");

// Users can have many posts
User.hasMany(Post, {
  foreignKey: "user_id",
});

// Users can have many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
});

// Every Posts belong to one user
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// POsts can have many comments
Post.hasMany(Comment, {
  foreignKey: "post_id",
});

// Every comment belngs ot one user
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

// Every comment belongs to one post
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

module.exports = {
  User,
  Post,
  Comment,
};



