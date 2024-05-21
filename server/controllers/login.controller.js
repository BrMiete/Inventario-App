const {User} = require("../models/user.model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "$ecRet0_"

//Para registrar el usuario
const register = async (req, res) => {
    let userData = req.body
    try {

        let existUser = await User.exists({username: userData.username})

        if (existUser){
            return res.status(500).json({errors: {username: "The username already exists"}})
        }

        let hash = await new Promise((resolve, reject) => {
            bcrypt.hash(userData.password, 10, function(err, hash) {
                if (err) reject(err)
                resolve(hash)
            });
        })

        let user = new User({
            ...userData,
            password: hash
        })
        await user.save()
        res.json({user})
        
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError){
            let errors = {}
            Object.keys(error.errors).map((key) => {
                errors[key] = error.errors[key].message
            })

            res.status(400).json({errors: errors})
        } else {
            res.status(500).json({error: error.toString()})
        }
    }
}

//Para iniciar sesión
const login = async (req, res) => {
    let data = req.body;
    try {
        let user = await User.findOne({username: data.username})

        let samePassword = await bcrypt.compareSync(data.password, user.password);

        if (samePassword){
            const payload = {
                id: user._id,
                name: user.username
            }

            let token = jwt.sign(payload, JWT_SECRET, {
                expiresIn: "1000d"
            });

            let refreshToken = jwt.sign(payload, JWT_SECRET, {
                expiresIn: "1000d"
            });

            res.cookie("token", token, {
                httpOnly: true
            })

            res.json({
                user: payload,
                token,
                refreshToken
            })
        } else {
            res.status(400).json({error: "The username or password you entered is incorrect"})
        }
    } catch (error) {
        
        if (error instanceof mongoose.Error.ValidationError){

        } else {
            res.status(500).json({error: error.toString()})
        }   
    }
}

//Para reenviar el token y refreshToken
const refresh = (req, res) => {
    let data = req.body;

    if (!data.refreshToken){
        return res.json({error: "Refresh token hasn't been sent"})
    }

    try {
        let payload = jwt.verify(data.refreshToken, JWT_SECRET);
        payload = {
            id: payload.id,
            name:payload.name
        }
        /*
        del payload.iat
        del payload.exp
        */

        let token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "30s"
        });
        let refreshToken = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "1000d"
        });

        res.json({
            token,
            refreshToken
        })
        
    } catch (error) {
        return res.json({error: error.toString()})
    }
}

//Para eliminar el token de las Cookies
const logout = async(req, res) => {
        try {
            res.clearCookie("token");
            res.status(200);
            res.json({ msg: "logged out" })
        } catch (error) {
            res.status(500);
            res.json(error);
        }
}

module.exports = {
    register,
    login,
    refresh,
    logout
}