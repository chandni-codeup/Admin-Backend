const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()
const authRoute = require("./Routes/AuthRoute");
const PORT = process.env.PORT || 8000;
require('./DatabaseConnect/DbConnect');
const noticeRoute=require('./Routes/NoticeRoute')
const applicantRoute=require('./Routes/ApplicantRoute')
const app= express()

app.use(express.json());
const router=express.Router()
app.use(router);

const corsOptions = {
  origin: ['http://localhost:5173', 'https://codeup.in'],
  credentials: true
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  next();
});

app.use('/static', express.static(__dirname+ '/Public/UploadImages'))
app.use('/api',noticeRoute)
app.use("/auth", authRoute);
app.use("/api", applicantRoute);

app.listen(PORT,  ()=>{
    console.log(`Server is running on ${PORT} `);
    
})

