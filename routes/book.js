const router = require('express').Router();
const bookController = require("../controller/bookController");


// ADD BOOK
router.post("/", bookController.addBook);

// GET ALL BOOKS
router.get("/", bookController.getAllBooks);

// GET AN BOOK
router.get("/:id", bookController.getBook);

// UPDATE BOOK
router.patch("/:id", bookController.updateBook);

// DELETE BOOK
router.delete("/:id", bookController.deleteBook);

module.exports = router;