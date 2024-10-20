import express from "express";
import {verifyToken} from "../middlewares/verifyToken.js";
import {postInvitation} from "../controllers/invitationController.js";
import {validation} from "../middlewares/validation.js";
import {postInvitationSchema} from "../validations/invitaionSchema.js";

const router = express.Router()

router.post("/invite", verifyToken, validation(postInvitationSchema), postInvitation)

export default router