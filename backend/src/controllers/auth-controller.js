import bcrypt from 'bcrypt'
import User from '../models/user.js'
import { createToken } from '../util/jwt.js'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../config.js'

export const login = async (req, res) => {
    try {
        const { run, pass } = req.body;

        if (!(run) || !(pass)) return res.status(400).json({ message: "Run y Password son requeridos" });

        const user = await User.findOne({ run });

        if (!user) return res.status(400).json({ message: "No se encontró un Usuario con el Run ingresado" });

        const isMatch = await bcrypt.compare(pass, user.password)

        if (!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

        const token = await createToken({ id: user._id });
        res.cookie("token", token, {
            httpOnly: process.env.NODE_ENV !== "development",
            secure: true,
            sameSite: "none",
        });

        res.cookie("user", {
            run: user.run,
            nombres: user.nombres,
            apellidos: user.apellidos,
            admin: user.admin
        })

        return res.status(200).json({ "auth": true })
    }catch(err) {
        return res.status(500).json({message: "Error al intentar iniciar sesión" })
    }
}

export const newUser = async (req, res) => {
    try {
        const { run, nombres, apellidos, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            run,
            nombres,
            apellidos,
            password: passwordHash
        });

        const userSaved = await user.save();

        return res.status(200).json({ saved: true, message: "Usuario creado con éxito!" });
    } catch (err) {
        return res.status(500).json({ saved: false, message: "Error al crear el usuario." });
    }
}

export const auth = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.status(400).json({ "auth": false })

        jwt.verify(token, SECRET_KEY, (err) => {
            if (err) return res.status(400).json({ "auth": false })
        })

        next()
    } catch (e) {
        return res.status(500).json({ message: e.message })
    }
}

export const logout = async (req, res) => {
    res.clearCookie('token')
    res.clearCookie('user')
    return res.status(200).json({ logout: true });
}