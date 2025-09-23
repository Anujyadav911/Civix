import express from "express";
import {
  createPetition,
  getPetitions,
  signPetition,
} from "../controllers/petitionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(protect, getPetitions);
router.route("/create").post(protect, createPetition);
router.route("/:id/sign").post(protect, signPetition);

export default router;
