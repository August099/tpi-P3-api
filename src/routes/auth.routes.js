import { Router } from "express";
import { verifyToken, verifySuper } from "../middlewares/auth.middleware.js";
import { registerUser } from "../services/register.services.js";
import { loginUser } from "../services/login.services.js";
import {
    setUserRole,
    updatePreferences,
    getUserRole,
    getPreferences
} from "../services/user.services.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/user/role", verifyToken, getUserRole);
router.get("/user/preferences", verifyToken, getPreferences);
router.put("/user/role", verifyToken, verifySuper, setUserRole);
router.put("/user/preferences", verifyToken, updatePreferences);


export default router;