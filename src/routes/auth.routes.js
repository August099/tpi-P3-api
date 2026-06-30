import { Router } from "express";
import { verifyToken, verifySuper } from "../middlewares/auth.middleware.js";
import { registerUser } from "../services/register.services.js";
import { loginUser } from "../services/login.services.js";
import {
    setUserRole,
    getUsers,
    removeUser
} from "../services/user.services.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", verifyToken, verifySuper, getUsers)
router.put("/users/role", verifyToken, verifySuper, setUserRole)
router.delete("/users/:id", verifyToken, verifySuper, removeUser)


export default router;