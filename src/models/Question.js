import { DataTypes } from "sequelize";
import { sequelize } from "../../db.js";

export const Question = sequelize.define("question", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    question: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    answer: {
        type: DataTypes.TEXT,
    }
}, { timestamps: true })