import { Router } from "express";
import {
  createItem,
  updateItem,
  deleteItem,
  findItem,
  findItems,
  findItemsByCategories,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  updateStock
} from "../services/item.services.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router =  Router();
router.get("/items/by-categories", verifyToken, findItemsByCategories);
router.get("/categories", verifyToken, getCategories);

router.post("/categories", verifyToken, verifyAdmin, createCategory);
router.put("/categories/:id", verifyToken, verifyAdmin, updateCategory);
router.delete("/categories/:id", verifyToken, verifyAdmin, deleteCategory);

router.get("/items", verifyToken, findItems);
router.get("/items/:id", verifyToken, findItem);

router.post("/items", verifyToken, verifyAdmin, createItem);
router.put("/items/stock/:id", verifyToken, updateStock);
router.put("/items/:id", verifyToken, verifyAdmin, updateItem);
router.delete("/items/:id", verifyToken, verifyAdmin, deleteItem);

export default router