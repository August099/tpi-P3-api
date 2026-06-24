import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import { validateRegisterUser } from "../helpers/userValidation.js";

export const registerUser = async (req, res) => {
  const errors = validateRegisterUser(req.body);

  if (Object.keys(errors).length != 0) {
    return res.status(400).send(errors);
  }
  
  const { name, email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    return res.status(400).send({ errors: {userError: "Usuario existente"} });
  }

  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);

  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword
  });

  res.json(newUser.id);
};