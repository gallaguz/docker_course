const express = require("express");
const mongoose = require("mongoose");

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

app.get('/testWithCurrentUser', (req, res) => {
    console.log('authApiUrl', authApiUrl);
    res.json({
        testWithCurrentUser: true
    })
})

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api at: http://localhost:${port}`);
        console.log(`host: ${host}`);
        console.log(`DB: ${db}`);
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