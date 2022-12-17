const express = require('express')
const ejs = require('ejs')
const path = require('path')
const multer = require('multer')

//Set Storage
const storage = multer.diskStorage({
    destination: './public/upload',
    filename: (req, file, cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

//Init upload
const upload = multer({
    storage: storage,
    limits: {fileSize: 10000000},
    fileFilter: (req, file, cb)=>{
        checkFileType(file, cb)
        
    }
}).single('myImage')

//Check File Type

function checkFileType(file, cb){
    //Allowed extensions
    filetypes = /jpeg|jpg|png/
    //Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    //Check mimetype
    const mimetype = filetypes.test(file.mimetype)

    if(mimetype && extname){
        return cb(null, true)
    }
    else{
        return cb("Error: Only images")
    }
}

//Init app
const app = express()



//EJS
app.set("view engine", "ejs")

//Public Folder
app.use(express.static("./public"))

//Welcome route
app.get('/',(req, res)=>{
    res.render('index')
})

//Upload POST
app.post('/upload',(req, res)=>{
    upload(req, res , (err)=>{
       if (err) {
            res.render('index',{
                msg: err
            }) 
       } else {
            console.log(req.file);
            if(req.file == undefined){
                res.render('index',{
                    msg: "Error: Please insert a file"
            })
        }
        else{
            res.render('index',{
                msg: "File Uploaded",
                file: `uploads/${req.file.filename}`
            })
        }
       }
        
    })
})

const PORT = 9090

app.listen(PORT, ()=>{
    console.log(`Connected to Port ${PORT}`);
})