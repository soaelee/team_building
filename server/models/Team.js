const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    category: {
        type: Number,
        default: 0
    },
    title: {
        type: String,
        maxlength: 50
    },
    description: {
        type: String,
    },
    images: {
        type: Array,
        default: []
    },
    depart: {
        // 0: 기획과 마케팅 1: 디자인 2: 프론트엔드 3: 백엔드
        type: Array,
        default: []
    },
    contact: {
        type: String,
    },
    views: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    },
    updateData: {
        type: Date,
        default: Date.now()
    }
}, { timestamps: true })

teamSchema.index({
    title: 'text',
    // description: 'text'
}, {
    weights: {
        title: 5,
        // description: 1
    }
})


const Team = mongoose.model('Team', teamSchema);

module.exports = { Team }