const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    alias: { type: String, required: true, unique: true },
    originalUrl: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    expirationDate: { type: Date }, // Optional expiration date
    visitCount: { type: Number, default: 0 },
});

module.exports = mongoose.model('Url', UrlSchema);