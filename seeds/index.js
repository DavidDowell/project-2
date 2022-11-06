const sequelize = require("../db/config");
const { User, Post, Vote, Tag, PostTag } = require("../models");

const userSeeds = require("./users.json");
const postSeeds = require("./posts.json");
const voteSeeds = require("./votes.json");
const tagSeeds = require("./tags.json");
const postTagSeeds = require("./post-tag.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true,
  }).then((users) => {
    postSeeds.forEach((val, index, arr) => {
      arr[index].user_id = users.map((user) => user.dataValues.id)[
        arr[index].user_id - 1
      ];
    });
    voteSeeds.forEach((val, index, arr) => {
      arr[index].user_id = users.map((user) => user.dataValues.id)[
        arr[index].user_id - 1
      ];
    });
  });

  await Post.bulkCreate(postSeeds, {
    individualHooks: true,
    returning: true,
  });

  await Vote.bulkCreate(voteSeeds, {
    individualHooks: true,
    returning: true,
  });

  await Tag.bulkCreate(tagSeeds, {
    individualHooks: true,
    returning: true,
  });
  await PostTag.bulkCreate(postTagSeeds, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
