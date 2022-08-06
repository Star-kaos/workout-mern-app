const jwt = require("jsonwebtoken")
exports.auth = (req, res, next) => {

    const token = req.headers["x-auth-token"]

    if (!token) {
        res.status(401).json({ msg: "001: UNAUTHORIZED", isAuth: false })
        return
    }
    try {
        const authVerification = jwt.verify(token, "ilovebasketballsomuch")
        console.log("authVerification", authVerification)
        next()
    } catch (err) {
        res.status(401).json({ msg: "002: UNAUTHORIZED", isAuth: false })
        return
    }
}