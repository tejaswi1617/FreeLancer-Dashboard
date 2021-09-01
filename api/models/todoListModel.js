/**
 * Author: Bansi Mehta.
 * Created On: 2021-07-20.
 * Model for todo list.
 */
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;


const todoListSchema = new Mongoose.Schema({
    id: {
        type: Schema.Types.ObjectID
    },
    title: {
        type: String
    },
    status: {
        type: Boolean
    },
    date: {
        type: Date,
        default: Date.now()
    },
    userId:{
        type: Schema.Types.ObjectID,
        ref: "users"
    },
});

// Model according to collection: "to_do_list"
module.exports = Mongoose.model("to_do_list", todoListSchema, "to_do_list");
