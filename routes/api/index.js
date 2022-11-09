const router = require("express").Router();
const { UserController } = require("../../controllers");
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");

const isAuthenticated = require("../../middleware/isAuthenticated");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", isAuthenticated, UserController.logout);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", isAuthenticated, commentRoutes);

module.exports = router;
