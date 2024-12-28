
function verifyToken(req, res, next) {
    const jwt = require('jsonwebtoken');
    jwt.verify(req.headers.authorization.replace('Bearer ', ''), process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.locals.userId = decoded.id;
        next();
    });
}

module.exports = verifyToken