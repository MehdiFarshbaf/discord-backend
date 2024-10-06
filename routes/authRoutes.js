import express from "express";

// controllers
import {userLogin, userRegister} from "../controllers/authController.js";

// middlewares
import {validation} from "../middlewares/validation.js";

// validations
import {loginSchema, registerSchema} from "../validations/authSchemas.js";

const router = express.Router()

router.post("/login", validation(loginSchema), userLogin)
router.post("/register", validation(registerSchema), userRegister)

export default router