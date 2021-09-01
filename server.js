const express = require('express');
const mongoose = require("mongoose");

const path = require('path');

const app = express();
const cors = require('cors');
app.use(cors());

//Configurations
const port = process.env.PORT || 3000;
const mongodb_url = "mongodb://ass3:2020@assignment3-shard-00-00.3zfwi.mongodb.net:27017,assignment3-shard-00-01.3zfwi.mongodb.net:27017,assignment3-shard-00-02.3zfwi.mongodb.net:27017/freelancer?ssl=true&replicaSet=atlas-7i888h-shard-0&authSource=admin&retryWrites=true&w=majority";
app.use(express.json());

//API Routes
app.use('/api',require('./api'));

app.use(express.json());
app.use(express.static(path.join(__dirname, './frontend/build')));
app.use('/api',require('./api'));
app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname, './frontend/build/index.html'));
});


mongoose.connect(mongodb_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

mongoose.connection.on("error", err => {
    console.log("err", err)
});

mongoose.connection.on("connected", (err, res) => {

    console.log("Mongoose connected");

    app.listen(port, () => {
        console.log(`App started at http://localhost:${port}`)
    });
});
