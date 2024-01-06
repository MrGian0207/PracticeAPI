const {Author, Book} = require("../model/model");

const bookController = { 
    // ADD BOOK 
    addBook: async(req, res, next) => { 
        try{ 
          const newBook = new Book(req.body); 
          const savedBook = await newBook.save(); 
        
          if(req.body.author) {
            const author = await Author.findById(req.body.author);
            //author.books.push(savedBook); or 
            await author.updateOne({$push: {books: savedBook._id}});
            // or author.books.push(savedBook); await author.save();
          }
          res.status(200).json(savedBook); 
        } catch (err) { 
            res.status(500).json(err); 
        }
    },

    // GET ALL BOOKS
    getAllBooks: async(req, res, next) => { 
        try{ 
          const books = await Book.find(); 
          res.status(200).json(books);
        } catch (err) { 
            res.status(500).json(err); 
        }
    },

    // GET AN BOOK
    getBook: async(req, res, next) => { 
        try{ 
            const book = await Book.findById(req.params.id).populate("author"); 
            res.status(200).json(book);
        } catch (err) { 
            res.status(500).json(err); 
        }
    },

    // UPDATE BOOK
    updateBook: async(req, res, next) => { 
      try{
        const book = await Book.findById(req.params.id);
        await book.updateOne({$set: req.body});
        res.status(200).json("Updated successfully");
      } catch (err) { 
        res.status(500).json(err);
      }
    },

    // DELETE BOOK
    deleteBook: async(req, res, next) => { 
      try{
        await Author.updateMany(
          { books: req.params.id }, 
          { $pull: { books: req.params.id } }
        );
        const book = await Book.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted successfully");
      } catch (err) { 
        res.status(500).json(err);
      }
    },
};

module.exports = bookController;