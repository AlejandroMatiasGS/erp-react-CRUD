import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../../config';

export const auth = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) { return res.status(401).json({ message: "No token, autorización denegada" }) }

        jwt.verify(token, SECRET_KEY, (error, user) => {
            if (error) { return res.status(401).json({ message: "El token no es válido" }); }
            req.user = user;
            next();
        });
    }catch(err) { return res.status(500).json({ message: error.message }); }
}