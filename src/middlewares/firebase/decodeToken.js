const admin = require('./firebase-config');
class middleware {
    async decodeToken(req, res, next) {
        const token = req.headers.authorization.split(' ')[1];
        try {
            const decodeValue = await admin.auth().verifyIdToken(token);
            if (decodeValue) {
                req.uid = decodeValue.uid;
                return next();
            }
            return res.status(401).json({ message: 'Unauthorized' });
        } catch (error) {
            console.log('error', error);
            return res.status(500).json({ message: 'Internal error' });
        }
    }
}
module.exports = new middleware();