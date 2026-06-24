import { Op } from "sequelize";
import { Item } from "../models/Item.js";
import { validateItem } from "../helpers/itemValidation.js";
import { Category } from "../models/Category.js";
import { ItemCategory } from "../models/ItemCategory.js";

export const findItems = async (req, res) => {
  const items = await Item.findAll({include: Category});
  res.json(items);
};

export const findItem = async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByPk(id, {include: Category});

  if (!item) {
    return res.status(404).send({ errors: {itemError: "Producto no encontrado"} });
  }

  res.json(item);
};

export const createItem = async (req, res) => {
  const result = validateItem(req.body)

  if (Object.keys(result).length != 0) {
    return res.status(400).send({ errors: result });
  }
  
  const { name, description, image, price, discount, stock, available, categories } = req.body;

  const newItem = await Item.create({
    name,
    description,
    image,
    price,
    discount,
    stock,
    available
  });

  if (categories) {
    await newItem.setCategories(categories)
  }

  res.json(newItem);
};

export const updateItem = async (req, res) => {
  const result = validateItem(req.body)

  if (Object.keys(result).length != 0) {
    return res.status(400).send({ errors: result });
  }

  const { id } = req.params;
  const { name, description, image, price, discount, stock, available, categories } = req.body;

  const item = await Item.findByPk(id);

  if (!item) {
    return res.status(404).send({ errors: {itemError: "Producto no encontrado"} });
  }

  await item.update({ 
    name,
    description,
    image,
    price,
    discount,
    stock,
    available
  });

  if (categories) {
    await item.setCategories(categories)
  }

  res.json(item);
};

export const deleteItem = async (req, res) => {
  const { id } = req.params;
  const item = await Item.findByPk(id);

  if (!item) {
    return res.status(404).send({ errors: {itemError: "Producto no encontrado"} });
  }

  await item.destroy();
  
  res.send(`Producto con id ${id} eliminado`);
};

export const findItemsByCategories = async (req, res) => {
  const { categoryIds } = req.query;

  const ids = categoryIds.split(",").map((c) => parseInt(c));

  const items = await Item.findAll({
    include: {
      model: Category,
      where: {
        id: { [Op.in]: ids }
      }
    },
    distinct: true
  });

  res.json(items);
};

export const getCategories = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories)
}

export const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ errors: {name: "El nombre es requerido"} });
  }

  const exists = await Category.findOne({where: { name }})

  if (exists) {
    return res.status(400).send({ errors: {category: "La categoria ya existe."} });
  }

  const newCategory = await Category.create({name})

  res.json(newCategory)
}

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ errors: {name: "El campo no puede estar vacio."} });
  }

  const category = await Category.findByPk(id);

  if (!category) {
    return res.status(404).json({ errors: {category: "La categoría a modificar no existe."} });
  }

  const exists = await Category.findOne({where: { name }})

  if (exists) {
    return res.status(400).send({ errors: {category: "La categoria ya existe."} });
  }

  await category.update({ name });

  res.json(category);
};

export const deleteCategory = async (req, res) => {
  const { name } = req.params;

  const category = await Category.findOne({where: {name}});

  if (!category) {
    return res.status(404).json({ errors: {category: "La categoria no existe."} });
  }

  await category.destroy();
  res.json("Categoría eliminada correctamente");
};
