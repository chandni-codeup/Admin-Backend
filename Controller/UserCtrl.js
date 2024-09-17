// const AdminModel= require('../Model/AdminModel')
// const jwt = require('jsonwebtoken');
// const { OAuth2Client } = require('google-auth-library');

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// const verifyGoogleToken= async(token)=>{
//     const ticket= await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     return ticket.getPayload();
// }

// const login = async(req,res)=>{
//     const {token}=req.body;

//     try{
//         const googleUser = await verifyGoogleToken(token);

//         let user= await AdminModel.findOne({email: googleUser.email})

//         if(!user){
//             user=new AdminModel({
//                 name: googleUser.name,
//                 email: googleUser.email,
//                 profilePhoto: googleUser.profilePhoto
//             })

//         await user.save();
//         }

//         const jwtToken = jwt.sign({userId: AdminModel._id }, process.env.JWT_SECRET, { expiresIn:"1d"});

//         res.json({ token : jwtToken});
//     }
//     catch(err){
//         res.status(401).json({error :"Invalid google token"})
//     }
// }

// const adminDetails=async(req,res)=>{
//     try {
//         const adminDetails=await AdminModel.find();
//         res.json(adminDetails);
//     } catch (error) {
//         res.json({error:error.message})
//     }
// }
// module.exports={login, adminDetails}