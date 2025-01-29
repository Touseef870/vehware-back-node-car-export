import { Router } from "express";
import authRoute from './../src/authentication/router.js';

const router = Router();

router.use('/auth', authRoute)

export default router;