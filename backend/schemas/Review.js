/**
 * Goal Model
 *
 * Defines what a goal is
 */
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    userId: String,
    confirmation: Boolean,
    delivery: Boolean,
    deliveryRating: Number,
    websiteEase: Number,
    lookingFor: Boolean,
    comments: String,
    sentiment: String,
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
    collection: 'reviews'
});

export default mongoose.model('reviews', reviewSchema);
