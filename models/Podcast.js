const mongoose = require('mongoose');

const PodcastSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    episodes: { type: Array, required: true },
    creator: { type: String, required: true }

}, { timestamps: true })

mongoose.models = {}
export default mongoose.model("Podcast", PodcastSchema);