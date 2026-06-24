import { Cart } from "./Cart.js";
import { CartItem } from "./CartItem.js";
import { Item } from "./Item.js";
import { User } from "./User.js";
import { Question } from "./Question.js";
import { Category } from "./Category.js";
import { ItemCategory } from "./ItemCategory.js";

User.hasOne(Cart, { foreignKey: "userId" });
Cart.belongsTo(User, { foreignKey: "userId" });

Cart.hasMany(CartItem, { foreignKey: "cartId" });
CartItem.belongsTo(Cart, { foreignKey: "cartId" });

CartItem.belongsTo(Item, { foreignKey: "itemId" });
Item.hasMany(CartItem, { foreignKey: "itemId" });

Item.hasMany(Question, { foreignKey: "itemId" });
Question.belongsTo(Item, { foreignKey: "itemId" });

User.hasMany(Question, { foreignKey: "userId" });
Question.belongsTo(User, { foreignKey: "userId" });

Item.belongsToMany(Category, { through: ItemCategory, foreignKey: "itemId" });
Category.belongsToMany(Item, { through: ItemCategory, foreignKey: "categoryId", onDelete: "CASCADE" });