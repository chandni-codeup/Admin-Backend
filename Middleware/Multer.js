const multer= require('multer')

const nstorage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./Public/UploadImages")
    },
    filename: function(req,file,cb){
        cb(null,  file.originalname)
    }
})

const upload = multer({ storage: nstorage });

module.exports= {upload}