const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
    userName: { type: String },
    orgName: { type: String },
    roomId: { type: String },
    userId: { type: String },
    videoType: { type: String },
});

module.exports = model("VideoChat", schema);
