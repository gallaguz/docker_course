const express = require("express");

const { port, host, db } = require("./configuration");
const { connectDb } = require("./helpers/db");

const app = express();

app.get("/test", (req, res) => {
    res.send("Our auth server is working correctly...");
});

app.get("/api/currentUser", (req, res) => {
    res.json({
        id: "1234",
        email: "foo@gmail.com"
    });
});

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started auth at: http://llocalhost:${port}`);
        console.log(`host: ${host}`);
        console.log(`DB: ${db}`);
    });
};

connectDb()
    .on("error", console.log)
    .on("disconnected", connectDb)
    .once("open", startServer);