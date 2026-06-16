import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validateLoginUser } from "../helpers/userValidation.js";

export const loginUser = async (req, res) => {
  const result = validateLoginUser(req.body);

  if (Object.keys(result).length != 0) {
    return res.status(400).send({ errors: result });
  }

  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return res.status(401).send({ message: "Usuario no existente" });
  }
  const comparison = await bcrypt.compare(password, user.password);

  if (!comparison) {
    return res.status(401).send({ message: "Email y/o contraseña incorrecta" });
  }

  const secretKey = "contraseniarandom";

  const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });

  return res.json(token);
};