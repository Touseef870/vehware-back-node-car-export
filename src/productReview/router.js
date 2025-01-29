import { Router } from "express";
import getByIdController from "./controllers/getById.js";
import postController from "./controllers/post.js";
import deleteController from "./controllers/delete.js";
import updateController from "./controllers/update.js";
import verifyToken from "../../middleware/index.js";
const router = Router();

router.post("/", verifyToken, postController)
router.get("/get/:id", getByIdController)
// router.delete("/:id", deleteController)
// router.put("/:id", updateController)

export default router;