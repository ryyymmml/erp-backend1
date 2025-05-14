const mongoose = require('mongoose');
const schema =mongoose.Schema;


//define the schema 
const  articleSchema=new mongoose.Schema({
username:String
});

//Create a model
const Mydata = mongoose.model('My dataa', articleSchema);


//export the model
module.exports= Mydata