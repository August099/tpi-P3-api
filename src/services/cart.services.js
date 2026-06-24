import { Cart } from "../models/Cart.js";
import { CartItem } from "../models/CartItem.js";
import { Item } from "../models/Item.js";

export const getCart = async (req, res) => {
    const userId = req.user.id;

    const cart = await Cart.findOne({
        where: { userId },
        include: {
        model: CartItem,
        include: Item
        }
    });

    if (!cart) {
        return res.status(404).json({ errors: { cartError: "Carrito no encontrado" }});
    }

    res.json(cart);
};

export const addItemToCart = async (req, res) => {
    const userId = req.user.id;
    const { itemId, quantity } = req.body;

    if (!quantity || quantity <= 0) {
        return res.status(404).json({ errors: {cartError: "El campo cantidad no puede estar vacio y debe ser positivo."} });
    }

    let cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
        cart = await Cart.create({ userId });
    }

    const cartItem = await CartItem.findOne({ where: { cartId: cart.id, itemId } });

    if (cartItem) {
        await cartItem.update({ quantity: cartItem.quantity + quantity });
    } else {
        await CartItem.create({ cartId: cart.id, itemId, quantity });
    }

    res.json(`Item con id ${itemId} agregado correctamente`);
};

export const incrementQuantity = async (req, res) => {
  const userId = req.user.id;
  const { itemId } = req.params;

  const cart = await Cart.findOne({ where: { userId } });
  const cartItem = await CartItem.findOne({ where: { cartId: cart.id, itemId } });

  if (!cartItem) {
    return res.status(404).json({ errors: {cartError: "Item no encontrado en el carrito."} });
  }

  await cartItem.increment("quantity", { by: 1 });
  await cartItem.reload();

  res.json(cartItem);
};

export const decrementQuantity = async (req, res) => {
    const userId = req.user.id;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ where: { userId } });
    const cartItem = await CartItem.findOne({ where: { cartId: cart.id, itemId } });

    if (!cartItem) {
        return res.status(404).json({ message: "Item no encontrado en el carrito" });
    }

    if (cartItem.quantity <= 1) {
        await cartItem.destroy()
        return res.json("Item eliminado correctamente del carrito");
    }

    await cartItem.decrement("quantity", { by: 1 });
    await cartItem.reload();

    res.json(cartItem);
};

export const removeItemFromCart = async (req, res) => {
    const userId = req.user.id;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ where: { userId } });
    const cartItem = await CartItem.findOne({ where: { cartId: cart.id, itemId } });

    if (!cartItem) {
        return res.status(404).json({ errors: {cartError: "Item no encontrado en el carrito"} });
    }

    await cartItem.destroy();
    res.json(`Item con id ${itemId} eliminado correctamente`);
};

export const cleanCart = async (req, res) => {
    const userId = req.user.id;

    const cart = await Cart.findOne({ where: { userId } });

    if (!cart) {
        return res.status(404).json({ errors: {cartError: "Carrito no encontrado."} });
    }

    await CartItem.destroy({ where: { cartId: cart.id } });

    res.json("Carrito vaciado correctamente.");
};