import { User } from "../models/User.js";
import { validateEmail, validateString, validatePassword } from "../helpers/userValidation.js";

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

    const updatedUser = await User.findOne({where:{email}, attributes: ["id", "name", "email", "role"]})
    
    res.json(updatedUser)
}

export const getUsers = async (req, res) => {
    const users = await User.findAll({attributes: ["id", "name", "email", "role"]})
    res.json(users)
}

export const removeUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
    return res.status(404).send({ errors: {userError: "Producto no encontrado"} });
    }

    try {
        await user.destroy();
        res.send(id);
    } catch (error) {
        res.status(500).json({ errors: {userError: "Error al eliminar el usuario"} });
    }
}
