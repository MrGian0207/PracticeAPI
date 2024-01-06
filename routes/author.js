const router = require('express').Router();
const authorController = require("../controller/authorController");
// Add Author 
router.post("/", authorController.addAuthor);

// GET ALL AUTHORS
router.get("/", authorController.getAllAuthors);

//GET AN AUTHOR
router.get("/:id", authorController.getAuthor);

//UPDATE AUTHOR
router.patch("/:id", authorController.updateAuthor);

//DELETE AUTHOR 
router.delete("/:id", authorController.deleteAuthor);

module.exports = router;