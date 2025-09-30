import express from "express"
import { addFood, getFoodByRestaurant , removeFood, getFoodTypes, getFoodsByType, getAllFoods} from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();

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
foodRouter.post("/remove", removeFood)
foodRouter.get("/restaurant/:restaurantId", getFoodByRestaurant);
foodRouter.get("/types", getFoodTypes); // Get all available food types
foodRouter.get("/type/:foodType", getFoodsByType); // Get foods by specific type
foodRouter.get("/all", getAllFoods); // Get all foods with optional filtering
export default foodRouter;