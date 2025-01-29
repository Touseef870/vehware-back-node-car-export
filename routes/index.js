import { Router } from "express";
import authRoute from './../src/authentication/router.js';
import productRoute from './../src/addProducts/router.js';
import productReviewRoute from './../src/productReview/router.js';

const router = Router();

router.use('/auth', authRoute)
router.use('/product', productRoute)
router.use('/product_review', productReviewRoute)

export default router;