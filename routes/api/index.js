const router = require("express").Router();
const { UserController } = require("../../controllers");
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");
const voteRoutes = require("./vote-routes");
const tagRoutes = require("./tag-routes");
const postTagRoutes = require("./postTag-routes");

const isAuthenticated = require("../../middleware/isAuthenticated");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout", isAuthenticated, UserController.logout);
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/votes", voteRoutes);
router.use("/tags", tagRoutes);
router.use("/postTags", postTagRoutes);

module.exports = router;
