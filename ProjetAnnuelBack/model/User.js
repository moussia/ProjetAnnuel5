import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const schema = new Schema({
    lastname: {
        type: String,
        required: true
    },
    firstname: {
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
    phone: {
        type: String,
        required: true
    },
    // role: {
    //     enum: ['PARENT', 'PROFESSIONAL'],
    //     default: 'PARENT'
    // },
    // birthday: {
    //     type: Date,
    //     required: true
    // },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    zipcode: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        enum: ['MAN', 'WOMAN'],
        default: 'MAN',
        required: true
    }
});

export default model('User', schema);