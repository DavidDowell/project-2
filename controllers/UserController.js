const { User, Post, Comment, Vote } = require("../models");

// CREATE new user
module.exports = {
  register: async (req, res) => {
    const {
      body: { firstName, lastName, email, password },
    } = req;
    try {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
      });

      delete user.password;

      req.session.save(() => {
        req.session.isAuthenticated = true;
        req.session.currentUser = user;
        req.session.user_id = user.id;
        req.session.loggedIn = true;
        res.status(200).json(user);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  login: async (req, res) => {
    const {
      body: { email, password },
    } = req;
    try {
      const user = await User.findOne({
        where: { email },
        attributes: { exclude: ["createdAt, updatedAt"] },
      });

      if (!user) {
        res
          .status(400)
          .json({ message: "Incorrect email or password. Please try again!" });
        return;
      }

      const validPassword = await user.checkPassword(password);

      if (!validPassword) {
        res
          .status(400)
          .json({ message: "Incorrect email or password. Please try again!" });
        return;
      }

      delete user.password;

      req.session.save(() => {
        req.session.isAuthenticated = true;
        req.session.currentUser = user;
        req.session.user_id = user.id;
        req.session.loggedIn = true;
        res.status(200).json({ user, message: "You are now logged in!" });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  logout: (req, res) => {
    if (req.session.isAuthenticated) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  },

  createUser: (req, res) => {
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    })
      .then(dbUserData => {
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;

          res.json(dbUserData);
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  getAllUsers: (req, res) => {
    User.findAll({
      attributes: { exclude: ["password"] },
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  getSingleUser: (req, res) => {
    User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "post_text", "created_at"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_text", "created_at"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
        {
          model: Post,
          attributes: ["title"],
          through: Vote,
          as: "voted_posts",
        },
      ],
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateUser: (req, res) => {
    User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  deleteUser: (req, res) => {
    User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
};
