import express from 'express'
import cors from 'cors'
import { login, newUser, auth, logout } from './controllers/auth-controller.js'
import { connectDB } from './db.js'
import cookieParser from 'cookie-parser'
import { createProduct, deleteProduct, editProduct, searchProducts } from './controllers/erp-products-controller.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.post('/reg', newUser)
app.post('/login', login)
app.post('/auth', auth, (req, res) => { return res.status(200).json({auth: true}) })
app.get('/logout', logout)

app.use(auth)

app.post("/searchProducts", searchProducts)
app.post("/createProduct", createProduct)
app.post('/editProduct', editProduct)
app.post('/deleteProduct', deleteProduct)


await connectDB()

app.listen(777, () => {
    console.log("Servidor corriendo en http://localhost:777")
})