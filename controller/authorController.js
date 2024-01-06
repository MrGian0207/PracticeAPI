const {Author, Book} = require("../model/model");

const authorController = { 
    // ADD AUTHOR 
    addAuthor: async(req, res, next) => { 
        try{ 
          const newAuthor = new Author(req.body); 
          const savedAuthor = await newAuthor.save(); 

          res.status(200).json(savedAuthor);
        } catch (err) { 
            res.status(500).json(err); 
        }
    },

    // GET ALL AUTHORS
    getAllAuthors: async(req, res, next) => { 
        try{ 
          const authors = await Author.find(); 
          res.status(200).json(authors);
        } catch (err) { 
            res.status(500).json(err); 
        }
    },

    // GET AN AUTHOR
    getAuthor: async(req, res, next) => { 
        try{ 
            const author = await Author.findById(req.params.id).populate("books"); 
            res.status(200).json(author);
        } catch (err) { 
            res.status(500).json(err); 
        }
    },

    //UPDATE AUTHOR
    updateAuthor: async(req, res, next) => { 
      try{
        const author = await Author.findById(req.params.id);
        await author.updateOne({$set: req.body});
        res.status(200).json("Updated successfully");
      } catch (err) { 
        res.status(500).json(err);
      }
    },

    //DELETE AUTHOR
    deleteAuthor: async(req, res, next) => { 
      try{
        await Book.updateMany(
          { author: req.params.id }, 
          { $pull: { author: req.params.id } }
        );
        const author = await Author.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted successfully");
      } catch (err) { 
        res.status(500).json(err);
      }
    },
};

module.exports = authorController;