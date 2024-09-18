const mongoose= require('mongoose')

const connection= async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        .then((result)=>{
            console.log("MongoDb is connected now.");
        })
        .catch((err)=>{
            console.log("DB is not connected",err);
        })
    } catch (err) {
            console.log("DB is not connected",err);
    }
}

connection()
module.exports = connection