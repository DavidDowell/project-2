const { User, Post } = require("./User");

module.exports = {
  User,
  Post,
};
const Post = require("./Post");
const User = require("./User");

User.hasMany(Post, {
  foreignKey: "user_id",
});
Post.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = {
  Post,
  User,
};
