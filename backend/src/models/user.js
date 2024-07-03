import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    run: {
        type: String,
        required: true,
        unique: true        
    },
    nombres: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    }
})

export default mongoose.model('User', userSchema)