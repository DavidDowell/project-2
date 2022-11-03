const sequelize = require("../db/config");
const { User, Post, Vote } = require("../models");

const userSeeds = require("./users.json");
const postSeeds = require("./posts.json");
const voteSeeds = require("./votes.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postSeeds, {
    individualHooks: true,
    returning: true,
  });

  await Vote.bulkCreate(postSeeds, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
