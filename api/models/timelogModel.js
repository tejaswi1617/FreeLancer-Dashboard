/* Author: Vishal Sancheti */

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const timelogSchema = new Mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectID,
    },
    project: {
        type: Schema.Types.ObjectID,
        ref: "projects",
    },
    task: {
        type: String,
    },
    startAt: {
        type: Date,
        default: Date.now
    },
    endAt: {
        type: Date,
    },
});

module.exports = Mongoose.model("timelogs", timelogSchema);