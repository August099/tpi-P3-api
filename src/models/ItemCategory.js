import { DataTypes } from "sequelize";
import { sequelize } from "../../db.js";

export const ItemCategory = sequelize.define("item_category", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  itemId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, { timestamps: false })