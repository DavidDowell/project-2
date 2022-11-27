const router = require("express").Router();

const { DashboardController } = require('../../controllers');
const isAuthenticated = require("../../middleware/isAuthenticated");

router.get("/", isAuthenticated, DashboardController.getAllPosts);
router.get("/comments/:id", isAuthenticated, DashboardController.getSinglePost);

module.exports = router;
