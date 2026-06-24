import { DataTypes } from "sequelize";
import { sequelize } from "../../db.js";

export const CartItem = sequelize.define("cart_item", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  cartId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  }
}, { timestamps: false })