/**
 * Goal Model
 *
 * Defines what a goal is
 */
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: String,
    reviews: [{
        ratings: [Number],
        comments: String,
    }],
    bucket: String,
    issues: [Number],
    customer_id: String,
    deleted_at: Date,
    created_at: {
        type: Date,
        default: Date.now(),
    },
    updated_at: {
        type: Date,
        default: Date.now(),
    },

}, {
    collection: 'users'
});

module.exports = mongoose.model('schemas', userSchema);