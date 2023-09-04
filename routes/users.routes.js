import express from "express";
const router = express.Router();
import { userRegister, authenticate, confirm, recoverPassword, verifyToken, newPassword, profile } from "../controllers/users.controllers.js";
import checkAuth from "../middlewares/checkAuth.js";
//Autenticación, registro y confirmación de usuarios


router.post("/", userRegister)
router.post("/login", authenticate)
router.get("/confirm/:token", confirm)
router.post("/recover-password", recoverPassword)
router.get("/recover-password/:token", verifyToken)
router.post("/recover-password/:token", newPassword)
router.get("/profile", checkAuth, profile)


export default router