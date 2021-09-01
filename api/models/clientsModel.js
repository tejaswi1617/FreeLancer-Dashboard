/**
 * Author: Janvi Patel.
 * Created On: 2021-07-20.
 * Model for clients.
 */
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const clientsSchema = new Mongoose.Schema({
   
    ClientId: {
        type: Number,
    },
    ClientName: {
        type: String,
    },
    ContactNo: {
        type: Number,
    },
    Email: {
        type: String,
    },
    Street: {
        type: String,
    },
    PostalCode:{
        type: String,
    },
    Region:{
        type: String,
    },
    Country:{
        type: String,
    },
    Organization: {
        type: String,
    },
    Website: {
        type: String,
    },
    LinkedInProfile: {
        type: String,
    },
    BusinessDescription: {
        type: String,
    },
    MeetingPlatform: {
        type: String,
    },
    userId:{
        type: Schema.Types.ObjectID,
    },
});

// Model according to collection: "clients"
module.exports = Mongoose.model("clients", clientsSchema);