import express from "express";
import { PORT } from "./config.js";
import itemRoutes from "./routes/items.routes.js"
import { sequelize } from "../db.js";
import "./models/Item.js"

const app = express()

try {
    app.listen(PORT)
    app.use(itemRoutes)

    await sequelize.sync()

    console.log(`Server listening on port ${PORT}`)
} catch (error) {
    console.log(`There was an error on initialization`)
}
