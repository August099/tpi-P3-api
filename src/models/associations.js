import { Cart } from "./Cart.js";
import { CartItem } from "./CartItem.js";
import { Item } from "./Item.js";
import { User } from "./User.js";
import { Question } from "./Question.js";
import { Category } from "./Category.js";
import { ItemCategory } from "./ItemCategory.js";

User.hasOne(Cart, { foreignKey: "userId", onDelete: "CASCADE" });
Cart.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

Cart.hasMany(CartItem, { foreignKey: "cartId", onDelete: "CASCADE" });
CartItem.belongsTo(Cart, { foreignKey: "cartId", onDelete: "CASCADE" });

CartItem.belongsTo(Item, { foreignKey: "itemId", onDelete: "CASCADE" });
Item.hasMany(CartItem, { foreignKey: "itemId", onDelete: "CASCADE" });

Item.hasMany(Question, { foreignKey: "itemId", onDelete: "CASCADE" });
Question.belongsTo(Item, { foreignKey: "itemId", onDelete: "CASCADE" });

User.hasMany(Question, { foreignKey: "userId", onDelete: "CASCADE" });
Question.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

Item.belongsToMany(Category, { through: ItemCategory, foreignKey: "itemId", onDelete: "CASCADE" });
Category.belongsToMany(Item, { through: ItemCategory, foreignKey: "categoryId", onDelete: "CASCADE" });