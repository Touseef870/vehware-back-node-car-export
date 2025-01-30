import { Router } from "express";
import getController from "./controllers/get.js";
import getByIdController from "./controllers/getById.js";
import postController from "./controllers/post.js";
import { uploadMiddleware } from '../../middleware/index.js'
import deleteController from "./controllers/delete.js";
import updateController from "./controllers/update.js";
const router = Router();

router.post("/add", uploadMiddleware, postController)
router.get("/get", getController)
router.get("/get/:id", getByIdController)

// router.delete("/:id", deleteController)
// router.put("/:id", updateController)

export default router;