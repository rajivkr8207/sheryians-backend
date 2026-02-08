const jwt = require('jsonwebtoken')
const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.shery;
        if (!token) return res.status(401).json({ message: "Login required" });

        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
module.exports = authMiddleware