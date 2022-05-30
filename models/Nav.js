const mongoose = require("mongoose");
const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
    linkUrl: { type: String, required: true },
    linkName: { type: String, required: true },
    dropList: [],
});

module.exports = model("Nav", schema);
