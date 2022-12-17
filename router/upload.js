const express =  require('express')
const router = express.Router()
const upload = require('../handler/multer')
const Image = require('../models/Image')
const cloudinary = require('cloudinary')
const dotenv = require('dotenv')
require('../handler/cloudinary')




//Welcome route
router.get('/',(req, res)=>{
    const img = Image.find()
    // console.log(img);
    res.render('index', {img})

})

// router.post("/upload" , (req, res)=>{
//     upload(req, res , (err)=>{
//         if (err) {
//              res.render('index',{
//                  msg: err
//              }) 
//         } else {
//              console.log(req.file);
//              if(req.file == undefined){
//                  res.render('index',{
//                      msg: "Error: Please insert a file"
//              })
//          }
//          else{
//              res.render('index',{
//                  msg: "File Uploaded",
//                  file: `uploads/${req.file.filename}`
//              })
//          }
//         }
         
//      })
//  })

router.post('/upload', upload.single('myImage'), async(req, res)=>{
    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path)
        const image = new Image()
        image.imageURL = result.secure_url
        await image.save()
        res.render('index',{
            msg: "Successfully Uploded"
       
    })
    } catch (error) {
        console.log(error);
        res.render('index',{
            msg: error  })

    }
})

 module.exports = router