const mongoose = require('mongoose');

// schema is just a blueprint of data it is not the actual model
const postSchema = mongoose.Schema({
    // simplest way to define a property is just give type as shown below
    // title : String
    // but mongoose gives us more powers by passing more details than just a type

    title:{ type:String,required:true},
    content:{type:String,required:true}
});


// we need to create the actual model from the schema ie we will turn the schema
// definition into the model

// we are exporting this model so that this model can be used outside of this model file
// we will use this in app.js file when the angular application sends post request to /api/post
module.exports = mongoose.model('Post',postSchema);


