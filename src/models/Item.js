import { DataTypes } from "sequelize";
import { sequelize } from "../../db.js";

export const Item = sequelize.define("item", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    imageUrl: {
        type: DataTypes.STRING
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, { timestamps: false })