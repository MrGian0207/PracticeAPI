const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authorRoute = require("./routes/author");
const bookRoute = require("./routes/book");

// Thực thi package dotenv
dotenv.config();

//CONNECT DATABASE 
mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Connected to database");
        })
        .catch(err => {
            console.log("error connecting to database");
        });


app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.use(morgan("common"));


//ROUTES 
app.use("/v1/author", authorRoute);
app.use("/v1/book", bookRoute);

app.listen(8080, () => {
    console.log("Server is running ...");
})