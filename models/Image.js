const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    imageURL: {
            type: String
    }
})

const Image = mongoose.model("Image", ImageSchema)
module.exports = Image