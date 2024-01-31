const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },


    role:{
        type: String,
        enum: ['designer', 'owner', 'vendor'],
        default: 'designer'
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },


}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = { User };