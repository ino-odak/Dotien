const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Access denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: "Access denied" });
    }
};

