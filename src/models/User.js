import { DataTypes } from "sequelize";
import { sequelize } from "../../db.js";

export const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    preferences: {
        type: DataTypes.TEXT,
        defaultValue: "{}",
        allowNull: false,
        validate: {
            isObject(value) {
                const parsed = JSON.parse(value);
                if (typeof parsed !== "object" || Array.isArray(parsed) || parsed === null) {
                    throw new Error("Preferences debe ser un objeto");
                }
            }
        },
        get() {
            const val = this.getDataValue("preferences");
            return val ? JSON.parse(val) : {};
        },
        set(val) {
            this.setDataValue("preferences", JSON.stringify(val));
        }
    },
    role: {
        type: DataTypes.ENUM("Super", "Admin", "User"),
        defaultValue: "User",
        allowNull: false
    }
}, { timestamps: false })