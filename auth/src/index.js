const express = require("express");
const axios = require("axios");

const { port, host, db, apiUrl } = require("./configuration");
const { connectDb } = require("./helpers/db");

const app = express();

app.get("/test", (req, res) => {
    res.send("Our auth server is working correctly...");
});

app.get("/testApiData", (req, res) => {
    axios.get(apiUrl + "/testApiData").then(response => {
        res.json({
            testApiData: response.data.testApiData
        });
    });
});

app.get("/api/currentUser", (req, res) => {
    res.json({
        id: "1234",
        email: "foo@gmail.com"
    });
});

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started authentication service on port ${port}`);
        console.log(`Our host is ${host}`);
        console.log(`Database url ${db}`);
    });
};

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);