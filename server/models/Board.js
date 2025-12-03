const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Board', boardSchema)