const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

const { port, host, db, authApiUrl } = require("./configuration");
const { connectDb } = require("./helpers/db");

const app = express();

const postSchema = new mongoose.Schema({
    name: String
});
const Post = mongoose.model("Post", postSchema);

app.get("/test", (req, res) => {
    res.send("Our api server is working correctly...");
});

app.get("/testApiData", (req, res) => {
    res.json({
        testApiData: true
    });
});

app.get('/testWithCurrentUser', (req, res) => {
    axios.get(authApiUrl + "/currentUser").then(response => {
        res.json({
            testWithCurrentUser: true,
            currentUserFromAuth: response.data
        });
    }).catch((e)=> {
        console.log(e)
    });
})

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port ${port}`);
        console.log(`Our host is ${host}`);
        console.log(`Database url ${db}`);
        console.log(`Auth api url ${authApiUrl}`);
    });

    const silence = new Post({ name: "Silence" });
    silence.save(function(err, result) {
        if (err) return console.error(err);
        console.log("result", result);
    });
};

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);