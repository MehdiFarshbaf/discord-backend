import express from "express";
import {verifyToken} from "../middlewares/verifyToken.js";
import {acceptFriend, postInvitation, rejectFriend} from "../controllers/invitationController.js";
import {validation} from "../middlewares/validation.js";
import {acceptRejectSchema, postInvitationSchema} from "../validations/invitaionSchema.js";

const router = express.Router()

router.post("/invite", verifyToken, validation(postInvitationSchema), postInvitation)
router.post("/accept", verifyToken, validation(acceptRejectSchema), acceptFriend)
router.post("/reject", verifyToken, validation(acceptRejectSchema), rejectFriend)

export default router