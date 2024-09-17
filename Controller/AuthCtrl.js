
// const AdminModel = require("../Model/AdminModel");
// const { oauth2client } = require("../utils/googleConfig");
// const axios = require('axios');
// const jwt = require('jsonwebtoken');

// const googleLogin = async (req, res) => {
//     try {
//         const { code } = req.query;

//         // Exchange authorization code for access token
//         const { tokens } = await oauth2client.getToken(code);
//         oauth2client.setCredentials(tokens);

//         // Fetch user info from Google
//         const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`);
//         const { email, name, picture } = userRes.data;

//         // Check if user exists in the database
//         let user = await AdminModel.findOne({ email });
//         if (!user) {
//             // Create new user if not found
//             user = await AdminModel.create({
//                 name,
//                 email,
//                 profilePhoto: picture
//             });
//         }

//         // Generate JWT token
//         const { _id } = user;
//         const token = jwt.sign({ _id, email }, process.env.JWT_SECRET, { expiresIn: '1d' });

//         // Send success response with token and user data
//         return res.status(200).json({ message: 'Success', token, user });

//     } catch (error) {
//         console.error("Error during Google login:", error);
//         return res.status(500).json({ error: "Internal server error." });
//     }
// }

// module.exports = { googleLogin };


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
