/**
 * Author: Deep Patel.
 * Created On: 2021-07-28.
 * Model for User Registration.
 */
 const Mongoose = require("mongoose");
 const Schema = Mongoose.Schema;
 
 const usersSchema = new Mongoose.Schema({
    
     Name: {
         type: String,
     },
     Email: {
         type: String,
     },
     ContactNo: {
         type: String,
     },
     LinkedInProfile: {
         type: String,
     },
     Website:{
         type: String,
     },
     Password: {
        type: String,
    },
 });
 
 module.exports = Mongoose.model("users", usersSchema);
 