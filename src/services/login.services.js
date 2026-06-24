import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateLoginUser } from "../helpers/userValidation.js";

export const loginUser = async (req, res) => {
  const errors = validateLoginUser(req.body);

  if (Object.keys(errors).length != 0) {
    return res.status(400).send(errors);
  }

  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).send({ errors: {userError: "Usuario no existente"} });
  }
  const comparison = await bcrypt.compare(password, user.password);

  if (!comparison) {
    return res.status(401).send({ errors: {userError: "Email y/o contraseña incorrecta"} });
  }

  const secretKey = "contraseniarandom";
  
  const token = jwt.sign({
    id: user.id,
    name: user.name,
    email: user.email
  }, secretKey, { expiresIn: "1d" });

  return res.json(token);
};