import { DataTypes } from "sequelize";
import { sequelize } from "../../db.js";

export const Item = sequelize.define("item", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    image: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    discount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, { timestamps: false })