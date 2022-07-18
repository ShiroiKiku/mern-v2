const { Schema, model } = require("mongoose");
const schema = new Schema({
    contant: { type: String },
});

module.exports = model("News", schema);
