import express from "express";
import protectRoutes from "../middleware/protectrouter.js";
import {getUsersforsidebar} from "../controllers/usercontroller.js"
const router=express.Router();

router.get("/",protectRoutes,getUsersforsidebar)

export default router;