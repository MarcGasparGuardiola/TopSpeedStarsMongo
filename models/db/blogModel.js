const mongoose = require(`mongoose`);
const blogSchema = mongoose.Schema({
    title: String,
    text: String,
    createdAt: { type: Date, required: false, default: Date.now }
});
module.exports = mongoose.model(`Blog`, blogSchema);
