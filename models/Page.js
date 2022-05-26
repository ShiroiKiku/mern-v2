const { Schema, model, Types } = require("mongoose");
const schema = new Schema({
    linkUrl: { type: String, required: true },
    linkName: { type: String, required: true },
    dropList: [],
    title: { type: String },
    body: { type: String },
    date: { type: Date, default: Date.now },
});
module.exports = model("Page", schema);
