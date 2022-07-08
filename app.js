const express = require("express");
const config = require("config");
const path = require("path");
const mongoose = require("mongoose");
const NodeMediaServer = require("node-media-server");
const configNMS = require("./config/confignms");
const url = require("url");

// const serve = require("node-media-server/src/api/routes/server");

const app = express();

const PORT = config.get("port") || 5000;

app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth.routes"));

app.use("/api/page", require("./routes/page.routes"));
app.use("/t", require("./routes/redirect.routes"));
app.use("/api/videochat", require("./routes/videochat.routes"));
app.use("/api/vch", require("./routes/vch.routes"));
app.use("/api/videochatdata", require("./routes/videouserdata.routes"));
app.use("/api/navigate", require("./routes/navigate.routes"));
if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client", "build")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

async function start() {
    try {
        await mongoose.connect(config.get("mongoUri"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    } catch (e) {
        console.log("Server Error", e.message);
        process.exit(1);
    }
}
0;
//node-media-server

var nms = new NodeMediaServer(configNMS);
// nms.run();
const server = app.listen(PORT, () =>
    console.log(`App listening on port ${PORT}!`)
);
var io = require("./sockets/socket").initialize(server);

io.on("connection", (socket) => {
    //Полозователь зашел
    socket.on("join-room", (roomId, userId) => {
        // Подключился к комнате
        socket.join(roomId);
        //Данные о пользователе отправляются другим пользователям
        socket.broadcast.emit("user-connected", userId);
        socket.on("disconnect", async () => {
            socket.broadcast.emit("user-disconnected", userId);
            userDelite(userId);
        });
    });

    socket.on("disc", (userId) => {
        socket.broadcast.emit("user-disconnected", userId);
        socket.emit("user-disconnected", userId);
        userDelite(userId);
    });
});

const userDelite = async (userId) => {
    try {
        const form = {
            userId: userId,
        };

        const userDel = JSON.stringify(form);

        await fetch("http://localhost:5000/api/videochatdata/deldata", {
            method: "POST",
            body: userDel,
            headers: { "Content-Type": "application/json" },
        });
    } catch (e) {
        console.log("fetch ошибка на сервере", e);
    }
};

start();
