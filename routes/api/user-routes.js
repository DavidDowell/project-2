const router = require("express").Router();

// GET all /api/users
router.get("/", (req, res) => {
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
// GET one /api/users/:id
// POST /api/users
// PUT /api/users/:id
// DELETE /api/users/:id
