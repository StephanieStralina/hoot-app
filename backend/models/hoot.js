const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema ({
    text: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
},
{ timestamps: true }
);

const hootSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['News', 'Sports', 'Games', 'Movies', 'Music', 'Television'],
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema],
    
},
{timestamps: true}
);

module.exports = mongoose.model('Hoot', hootSchema);