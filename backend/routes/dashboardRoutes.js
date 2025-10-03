import express from "express";
import {
  getDashboardStats,
  getOfficialDashboardStats,
} from "../controllers/dashboardController.js"; // 1. Import new function
import { protect } from "../middleware/authMiddleware.js";
import { isOfficial } from "../middleware/roleMiddleware.js"; // 2. Import role middleware

const router = express.Router();

// Route for regular citizens
router.route("/stats").get(protect, getDashboardStats);

// 3. Add the new, secure route for officials
router
  .route("/official-stats")
  .get(protect, isOfficial, getOfficialDashboardStats);

export default router;
