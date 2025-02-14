import { Router } from "express";
import authRoute from './../src/authentication/router.js';
import productRoute from '../src/product/router.js';
import productReviewRoute from './../src/productReview/router.js';
import inquiryProductRoute from './../src/inquireProduct/router.js';
import betAuthRoute from './../src2/authentication/router.js';

const router = Router();

router.use('/auth', authRoute)
router.use('/product', productRoute)
router.use('/product_review', productReviewRoute)
router.use('/product_inquiry', inquiryProductRoute)

// Beting Apis
router.use('/bet_auth', betAuthRoute)

export default router;