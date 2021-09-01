/**
 * Author: Deep Patel.
 * Created On: 2021-07-20
 * Model for project.
 */

const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const projectSchema = new Mongoose.Schema({
    client: {
        type: String,
    },
    name: {
        type: String,
    },
});

module.exports = Mongoose.model("Project", projectSchema);
