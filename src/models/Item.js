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
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    imageUrl: {
        type: DataTypes.STRING,
    },
    tags: {
        type: DataTypes.TEXT,
        defaultValue: "[]",
        allowNull: false,
        get() {
            const val = this.getDataValue("tags");
            return val ? JSON.parse(val) : [];
        },
        set(val) {
            this.setDataValue("tags", JSON.stringify(val));
        }
    },
    discount: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
        allowNull: false,
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    }
}, { timestamps: false })