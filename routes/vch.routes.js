const { Router } = require("express");

const io = require("../sockets/socket").io();
const router = Router();

router.get("/:room", (req, res) => {
    // console.log(io);
    // io.on("connection", (socket) => {
    //     console.log("socket.id", socket.id);

    //     socket.on("test", (data) => {
    //         console.log("data", data);
    //     });
    //     socket.on("join-room", (roomId, userId) => {
    //         socket.join(roomId); // Join the room
    //         socket.broadcast.emit("user-connected", userId); // Tell everyone else in the room that we joined

    //         // Communicate the disconnection
    //         socket.on("disconnect", () => {
    //             socket.broadcast.emit("user-disconnected", userId);
    //         });
    //     });
    // });
    res.status(201).json(`url ${req.url}`);
    res.json(req.url);
});

module.exports = router;
