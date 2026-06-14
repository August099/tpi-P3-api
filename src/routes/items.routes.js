import { Router } from "express";
import {Item} from "../models/Item.js"

const router =  Router();

router.get('/items', async (req, res) => {
    const items = await Item.findAll()
    res.send(items)
})

router.get('/items/:id', async (req, res) => {
    const { id } = req.params
    const item = await Item.findByPk(id)
    res.send(item)
})

router.post('/items', (req, res) => {
    res.send("Creando item")
})

router.put('/items/:id', (req, res) => {
    const { id } = req.params
    res.send(`Actualizando item ${id}`)
})

router.delete('/items/:id', (req, res) => {
    const { id } = req.params
    res.send(`Eliminando item ${id}`)
})

export default router