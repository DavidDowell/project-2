const router = require("express").Router();
const sequelize = require("../../db/config");
const { Post, User, Comment, Vote, Tag, PostTag } = require("../../models");

router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
    attributes: [
      "id",
      "post_text",
      "title",
      "created_at",
      [
        sequelize.literal(
          "(SELECT SUM(vote_for) - SUM(NOT vote_for) FROM vote WHERE post.id = vote.post_id)"
        ),
        "vote_count",
      ],
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["firstName", "lastName"]
        },
      },
      {
        model: User,
        attributes: ["firstName", "lastName"]
      }
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("homepage", {
        posts,
        isAuthenticated: Boolean(req.session.isAuthenticated),
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
