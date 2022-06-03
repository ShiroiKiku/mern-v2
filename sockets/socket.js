const socket = require("socket.io");
var io = null;
exports.io = function () {
    return io;
};
exports.initialize = function (server) {
    return (io = socket(server, {
        cors: {
            origin: "http://localhost:3000",
        },
    }));
};
