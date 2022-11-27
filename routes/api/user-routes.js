const router = require("express").Router();
const { UserController } = require("../../controllers");

// GET all /api/users
router.get("/", UserController.getAllUsers);
// GET one /api/users/:id
router.get("/:id", UserController.getSingleUser);
// POST /api/users
router.post("/", UserController.createUser);
// PUT /api/users/:id
router.put("/:id", UserController.updateUser);
// DELETE /api/users/:id
router.delete("/:id", UserController.deleteUser);

module.exports = router;
