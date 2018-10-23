// const http = require('http');
// const app = require('./backend/app');
// const port = process.env.PORT || 3000;

// // const server = http.createServer((req,res) => {
// //     console.log(req,res);
// //     res.end('This is my first response');
// // });

// // tell express on which port are we working 
// // set configuration for my express enviroment 'port' is a reserved key in express
// app.set('port',port);
// const server = http.createServer(app);

// //  environment variables are Dynamically injected by the runtime in which this app runs
// server.listen( port );




// const app = require("./backend/app");
const app = require("./backend/app"); 

const debug = require("debug")("node-angular");
const http = require("http");


// just make sure that the port that we pass in here or the port that we will receive from the runtime environment
// is a valid number 
const normalizePort = val => {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};


// Error handling logic: if there is any error return gracefully 
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  debug("Listening on " + bind);
};


// Notice: process.env.PORT is typically going to be a string
const port = normalizePort(process.env.PORT || "5000");
app.set("port", port);

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);
server.listen(port);
 

