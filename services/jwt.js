import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export const token = {
    async generate(user) {
        const userForToken = {
            user: user.fullName,
            email: user.email,
        };
        return jwt.sign(userForToken, secret, { expiresIn: "1h"} );
    },
    async verify(req, res, next) {
        const authHeader = req.headers?.authorization;

        if (!authHeader) {
            return res.status(401).json({ success: false, message: 'Token no proporcionado, debe loguearse correctamente' });
        }

        const token = req.headers.authorization.split(" ")[1];
        if(token) {
            jwt.verify(token, secret, (err, decoded) => {
                if(err) {
                    return res.status(401).son({ succes: false, message: "Token Inválido o Expirado" });
                }
                
                req.decoded = decoded;
                next();
            })
        } else {
            res.status(401).json({ succes: false, message: "Debe Loguearse Correctamente para Realizar esta Acción."});
        }
    },
};