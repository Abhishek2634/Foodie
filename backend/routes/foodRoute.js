import express from "express"
import { addFood } from "../controllers/foodController.js"
import multer from "multer"
import { protect } from '../middleware/authMiddleware.js';
const foodRouter = express.Router();

// Authentication
router.get("/private", protect, (req, res) => {
  res.send("This is a protected food route");
});
// Image Storage Engine

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
      },
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

foodRouter.post("/add", upload.single('image'), addFood);

export default foodRouter;