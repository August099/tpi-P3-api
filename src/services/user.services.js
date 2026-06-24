import { User } from "../models/User.js";
import { validateEmail, validatePreferences } from "../helpers/userValidation.js";

export const getUserRole = async (req, res) => {
    const id = req.user.id

    const user = await User.findByPk(id)

    if (!user) {
        return res.status(404).json({ errors: {userError: "Usuario no encontrado"} });
    }

    res.json(user.role)
}

export const getPreferences = async (req, res) => {
    const id = req.user.id

    const user = await User.findByPk(id)

    if (!user) {
        return res.status(404).json({ errors: {userError: "Usuario no encontrado"} });
    }

    res.json(user.preferences)
}

export const setUserRole = async (req, res) => {
    const { email, role } = req.body;

    if (!validateEmail(email)) {
        return res.status(400).json({ errors: {email: "El email es invalido."} });
    }

    if (!role || !["Super", "Admin", "User"].includes(role)) {
        return res.status(400).json({ errors: {role: "El rol es invalido."} });
    }

    const user = await User.findOne({where:{email}});

    if (!user) {
        return res.status(404).json({ errors: {userError: "Usuario no encontrado"} });
    }

    await user.update({ role });
    
    res.json("Rol de usuario actualizado.");
}

export const updatePreferences = async (req, res) => {
    const id = req.user.id
    const { preferences } = req.body

    const user = await User.findByPk(id)

    if (!user) {
        return res.status(404).json({ errors: {userError: "Usuario no encontrado"} });
    }

    if (!validatePreferences(preferences)) {
        return res.status(404).json({ errors: {userError: "Error al actualizar las preferencias."} });
    }

    await user.update({preferences})

    res.json("Preferencias actualizadas.")
}