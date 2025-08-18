const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const irregularSchema = new Schema({

    firstForm: {
        type: String,
        required: true
    },
    firstFormTranscription: {
        type: String,
        required: true
    },
    secondForm: {
        type: String,
        required: true
    },
    secondFormTranscription: {
        type: String,
        required: true
    },
    thirdForm: {
        type: String,
        required: true
    },
    thirdFormTranscription: {
        type: String,
        required: true
    },
    translation: {
        type: String,
        required: true
    },
    removable: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
    ,
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('irregular_list', irregularSchema);