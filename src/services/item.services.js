import { Item } from "../models/Item.js";
import { validateItem } from "../helpers/itemValidation.js";

export const findItems = async (req, res) => {
  const items = await Item.findAll();
  res.json(items);
};

export const findItem = async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByPk(id);

  if (!item) {
    return res.status(404).send({ message: "Producto no encontrado" });
  }

  res.json(item);
};

export const createItem = async (req, res) => {
  const result = validateItem(req.body)

  if (Object.keys(result).length != 0) {
    return res.status(400).send({ errors: result });
  }
  
  const { title, price, description, imageUrl, available } = req.body;

  const newItem = await Item.create({
    title,
    price,
    description,
    imageUrl,
    available,
  });

  res.json(newItem);
};

export const updateItem = async (req, res) => {
  const result = validateItem(req.body)

  if (Object.keys(result).length != 0) {
    return res.status(400).send({ errors: result });
  }

  const { id } = req.params;
  const { title, price, description, imageUrl, available } = req.body;

  if (!title || !price) {
    return res
      .status(400)
      .send({ message: "Los campos titulo y precio son requeridos" });
  }

  const item = await Item.findByPk(id);

  if (!item) {
    return res.status(404).send({ message: "Producto no encontrado" });
  }

  await Item.update({
    title,
    author,
    rating,
    pageCount,
    summary,
    imageUrl,
    available,
  });

  await Item.save();

  res.json(item);
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByPk(id);

  if (!item) {
    return res.status(404).send({ message: "Producto no encontrado" });
  }

  await item.destroy();
  
  res.send(`Producto con id ${id} eliminado`);
};