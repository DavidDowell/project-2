const { User, Post, Comment, Vote } = require("../models");
const sequelize = require("../db/config");

module.exports = {
  getAllPosts: (req, res) => {
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
            attributes: ["firstName", "lastName"],
          },
        },
        {
          model: User,
          attributes: ["firstName", "lastName"],
        },
      ],
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  getSinglePost: (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
      },
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
            attributes: ["firstName", "lastName"],
          },
        },
        {
          model: User,
          attributes: ["firstName", "lastName"],
        },
      ],
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createPost: (req, res) => {
    Post.create({
      title: req.body.title,
      post_text: req.body.post_text,
      user_id: req.session.user_id,
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updatePostVote: (req, res) => {
    Post.vote(
      {
        post_id: req.body.post_id,
        vote_for: req.body.vote_for,
        user_id: req.session.user_id,
      },
      { Vote, Post, Comment }
    )
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updatePost: (req, res) => {
    Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deletePost: (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};