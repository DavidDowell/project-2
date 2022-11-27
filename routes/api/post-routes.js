const router = require("express").Router();

const { PostController } = require("../../controllers");
const isAuthenticated = require("../../middleware/isAuthenticated");

// GET all /api/posts
router.get("/", PostController.getAllPosts);
// GET one /api/posts/:id
router.get("/:id", PostController.getSinglePost);
// POST /api/posts
router.post("/", isAuthenticated, PostController.createPost);
// PUT /api/vote
router.put("/vote", isAuthenticated, PostController.updatePostVote);
// PUT /api/posts/:id
router.put("/:id", isAuthenticated, PostController.updatePost);
// DELETE /api/posts/:id
router.delete("/:id", isAuthenticated, PostController.deletePost);

module.exports = router;
