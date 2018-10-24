// This is going to be our express app

const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const Post = require("./models/post");
const mongoose = require("mongoose");

// var MongoClient = require('mongodb').MongoClient;

// zxcvbnm cZR80CZYc0JBrOn6 nLldCBIAHFYlf46V
// prashant nb6d81V8rFuzy9B4 TCz0X6i5pQXEQzUA 2qDSoGewW0eBkw10
mongoose
  .connect(
    "mongodb+srv://prashant:2qDSoGewW0eBkw10@cluster0-dwndg.mongodb.net/test?retryWrites=true"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Connection failed !");
  });

// Important thing about an express app is that it is just a big chain of middlewares(just normal functions)
// that we apply to an incoming requests so just like a funnel. we have different parts in a funnel and
// every part can do something with that incoming request example manipulate a request,do something with a response like send a response
// sending a response should be a task of a middleware

// app.use((req,res,next) => {
//     console.log('First middleware');
//     next();
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("hi");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,DELETE,OPTIONS"
  );

  next();
});

app.post("/api/posts", (req, res, next) => {
  console.log("hi there there");
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  // save(callback) what mongoose does behind the scenes that mongoose creates the write query for our database
  // to insert a new entry with that data and an automatically generated ID and save that to our database

  // also notice that the name of the collection(table) where our document (record) is stored is the plural case
  // of the name of the model that we created(Post -> posts() all lowercaseks)
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    }); // 201 means everything was okk and a new resource was created
  });
});

// the last argument to this use function is the callback function which is going to handle our  requestAnimationFrame
// the other arguments are filters (or other middlewares to apply)

// Here the first argument that I am going to pass is the path filter here '/api/posts' means all the request targeting localhost:3000/posts are going to reach this middleware
// all the other requests are going to go to the void as I dont have default error handler

app.get("/api/posts", (req, res, next) => {
  console.log("hi there");

  // this res object is now a powerful object than the native res object in http.createServer callback function
  // res.send('Hello from express !');
  // const posts = [
  //   {
  //     id: "sgdfsahdfjksjdf",
  //     title: "First server sid post",
  //     content: "This is coming from the server"
  //   },
  //   {
  //     id: "hjklrhuitrhjkdfn",
  //     title: "Second server sid post",
  //     content: "This is coming from the server !!!"
  //   }
  // ];

  // Post.find((err,documents) => {

  // });

  // use static methods on Post Model provided my mongoose
  Post.find().then(documents => {
    // console.log(documents);
    res.status(200).json({
      message: "Posts fetched successfully",
      posts: documents
    });
  });

  // notice no call to next() function in this middleware that means the request wont continue downwards to other middlewares
});

// :id is the dynamic path segment
app.delete("/api/posts/:id", function(req, res, next) {
  console.log("post params id to be deleted ", req.params.id);
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log("promise", result);
    res.status(200).json({ message: "Post deleted!" });

    // setTimeout(() => {
    //   res.status(200).json({ message: "Post deleted!" });
    // }, 5000);
  });
});

// here we are exporting the entire express app with all the middlewares attached to the express app variable
module.exports = app;
