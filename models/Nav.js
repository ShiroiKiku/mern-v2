const { Schema, model } = require("mongoose");
const schema = new Schema({
    navItemUrl: { type: String },
    navItemName: { type: String },
    navItemDropItems: {},
    navItemLvl: { type: Number },
});

module.exports = model("Nav", schema);
