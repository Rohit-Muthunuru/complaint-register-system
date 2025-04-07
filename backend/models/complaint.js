const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    title: String,
    content: String,
    author: String,
    image: String,
    category: String,
    status: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "auth", required: true } // Add this line
});

module.exports = mongoose.model("complaint", complaintSchema, "complaint");
