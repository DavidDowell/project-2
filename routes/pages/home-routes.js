const router = require("express").Router();
const sequelize = require("../../db/config");
const { Post, User, Comment, Vote, Tag, PostTag } = require("../../models");

router.get("/", (req, res) => {
  console.log("======================");
  Post.findAll({
    attributes: ["id", "post_text", "title", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at",
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']],
      }
    ],
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));

      res.render("homepage", { posts, loggedIn: Boolean(req.session.user_id) });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;
