import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/react-erp')
        console.log("BD Conectada")
    } catch (error) {
        console.log(error)
    }
}