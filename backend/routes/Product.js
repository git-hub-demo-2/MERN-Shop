const express=require('express')
const productController=require("../controllers/Product")
const router=express.Router()
const upload = require("../middleware/multer");
router
    .post("/",upload.fields([{ name: "thumbnail" }, { name: "images", maxCount: 4 }]),productController.create)
    .get("/",productController.getAll)
    .get("/:id",productController.getById)
    .patch("/:id",productController.updateById)
    .patch("/undelete/:id",productController.undeleteById)
    .delete("/:id",productController.deleteById)

module.exports=router