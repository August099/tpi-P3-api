import { Router } from "express";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";
import { 
    findQuestionsByItem,
    createQuestion,
    answerQuestion,
    deleteQuestion
 } from "../services/question.services.js";

const router = Router();

router.get("/items/:itemId/questions", verifyToken, findQuestionsByItem);
router.post("/questions", verifyToken, createQuestion);
router.put("/questions/:id/answer", verifyToken, verifyAdmin, answerQuestion);
router.delete("/questions/:id", verifyToken, deleteQuestion);

export default router;  