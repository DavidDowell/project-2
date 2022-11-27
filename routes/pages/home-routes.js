const router = require("express").Router();

const { HomeController } = require('../../controllers');

router.get("/", HomeController.getHomePage);
// get single post
router.get("/post/:id", HomeController.getSinglePost);

module.exports = router;
