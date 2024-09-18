const admin = require('firebase-admin');

if (!admin.apps.length) {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const secureEndpoint = async (req, res) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const uid = decodedToken.uid;

        const data = req.body; 
        res.status(200).json({
            message: 'Data received and processed successfully',
            userId: uid,
            data: data
        });
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}

const verifyToken = async (req, res) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];
    if (!idToken) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);

        const user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
            displayName: decodedToken.name || "User", 
            photoURL: decodedToken.picture
        };

        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Token verification failed', error });
    }
};


module.exports = {
    secureEndpoint,
    verifyToken
}
