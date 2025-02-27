import { Router } from "express";
import getController from "./controllers/get.js";
import getByIdController from "./controllers/getById.js";
import postController from "./controllers/post.js";
import { uploadMiddleware, verifyToken } from '../../middleware/index.js';
import deleteController from "./controllers/delete.js";
import updateController from "./controllers/update.js";
import ProductsSummaryController from "./controllers/ProductsSummary.js";   

const router = Router();

router.post("/add", verifyToken, uploadMiddleware, postController)
router.get("/get", getController)
router.get("/get/:id", getByIdController)
router.get("/products_summary", ProductsSummaryController)
router.delete("/delete/:id", verifyToken, deleteController)
router.patch("/update/:id", verifyToken, updateController)

export default router;