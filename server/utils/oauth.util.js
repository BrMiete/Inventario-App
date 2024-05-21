//Header
//...
//Authorization: Bearer <Token>

const jwt = require("jsonwebtoken");

const JWT_SECRET = "$ecRet0_"

const verifyToken = (request, response, next) => {
    const header = request.header("Authorization") || "";
    let token = header.split(" ")[1]

    if (!token && request.cookies){
        token = request.cookies.token
    }

    if (!token){
        return response.status(401).json({error: "Token hasn't been sent"})
    }

    try {
        const payload = jwt.verify(token, JWT_SECRET);
        request.user = payload
        next();
    } catch (error) {
        return response.status(401).json({error: error.toString()})
    }
}

module.exports = {
    verifyToken
}