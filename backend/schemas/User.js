/**
 * Goal Model
 *
 * Defines what a goal is
 */
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: String,
    goodReviews: Number,
    okReviews: Number,
    badReviews: Number,
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

export default mongoose.model('users', userSchema);
