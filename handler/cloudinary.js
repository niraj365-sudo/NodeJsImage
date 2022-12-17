const cloudinary = require("cloudinary");
  cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_ID,
  api_secret: process.env.API_SECRET,
});



// router.post("/adminupload/:id", upload.single("image"), async (req, res) => {
//     const { title, image } = req.body;
  
//     let errors = [];
  
//     if (!title) {
//       errors.push({
//         msg: "Please fill in all required fields",
//       });
//     }
  
//     if (errors.length > 0) {
//       res.render("uploadreport", {
//         errors,
//         title,
//         image,
//         user: req.user,
//       });
//     }
//     const result = await cloudinary.v2.uploader.upload(req.file.path);
//     const adminreport = new AdminReport();
//     adminreport.title = req.body.title;
//     adminreport.imageUrl = result.secure_url;
//     adminreport.toPatient = toPatient;
//     await adminreport.save();
//     req.flash("success_msg", "Report Uploaded Successfully!");
//     res.redirect("/adminupload/:id");
//   });
  