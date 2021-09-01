/**
 * Author: Sanket Shah.
 * Created On: 2021-07-26
 * Model for Calendar Event.
 */

 const Mongoose = require("mongoose");
 const Schema = Mongoose.Schema;
 
 /**
  * Model Schema for Calendar Event.
  */
 const calendarSchema = {
     eventName: {
        type: String
     },
     category: {
        type: String
     },
     date: {
        type: String
     },
     time: {
        type: String
     },
     viewStatus: {
         type: Boolean,
         default: false
     },
     userId:{
         type: Schema.Types.ObjectID,
     },
 };
 
 module.exports = Mongoose.model("calendars", calendarSchema);