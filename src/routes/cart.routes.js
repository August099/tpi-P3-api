import { Router } from "express";
import {
  getCart,
  addItemToCart,
  incrementQuantity,
  removeItemFromCart,
  decrementQuantity,
  cleanCart
} from "../services/cart.services.js";
import { verifyToken, verifyAdmin } from "../middlewares/auth.middleware.js";

const router =  Router();

router.get("/cart", verifyToken, getCart);
router.post("/cart/items", verifyToken, addItemToCart);
router.patch("/cart/items/:itemId/increment", verifyToken, incrementQuantity);
router.patch("/cart/items/:itemId/decrement", verifyToken, decrementQuantity);
router.delete("/cart/items/:itemId", verifyToken, verifyAdmin, removeItemFromCart);
router.delete("/cart", verifyToken, verifyAdmin, cleanCart);

export default router