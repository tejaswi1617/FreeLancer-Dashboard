/**
 * Author: Deep Patel.
 * Created On: 2021-07-20
 * Model for Testimonials.
 */

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;


const testimonialSchema = new Mongoose.Schema({
    project: {
        type: String
    },
    client: {
        type: String
    },
    feedback: {
        type: String
    },
    requestedOn: {
        type: Date,
        default: Date.now
    },
    userId:{
        type: Schema.Types.ObjectID,
    },
});

module.exports = Mongoose.model("testimonials", testimonialSchema);
