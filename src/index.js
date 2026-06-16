import express from "express";
import { PORT } from "./config.js";
import itemRoutes from "./routes/items.routes.js"
import authRoutes from "./routes/auth.routes.js";
import { sequelize } from "../db.js";
import "./models/Item.js"
import "./models/User.js";

const app = express()

try {
    app.use(express.json());
    app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        next();
    });
    app.listen(PORT)
    app.use(itemRoutes)
    app.use(authRoutes)

    await sequelize.sync({ alter: true })

    console.log(`Server listening on port ${PORT}`)
} catch (error) {
    console.log(`There was an error on initialization`)
}
