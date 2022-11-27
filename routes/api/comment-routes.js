const router = require("express").Router();
const { CommentController } = require("../../controllers");

router.get("/", CommentController.getAllComments);
router.post("/", CommentController.createComment);
router.delete("/:id", CommentController.deleteComment);

module.exports = router;
