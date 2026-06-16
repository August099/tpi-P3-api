import { Router } from "express";
import {
  createItem,
  updateItem,
  deleteItem,
  findItem,
  findItems,
} from "../services/item.services.js";
//import { verifyToken } from "../middlewares/verifyToken.js";

const router =  Router();

router.get("/items", findItems);
router.get("/items/:id", findItem);
router.post("/items", createItem);
router.put("/items/:id", updateItem);
router.delete("/items/:id", deleteItem);

export default router