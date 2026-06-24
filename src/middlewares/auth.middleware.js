import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const verifyToken = (req, res, next) => {
  const header = req.header("Authorization") || "";

  const token = header.split(" ")[1];

  if (!token) {
    return res.status(401).json({ errors: {userError: "No posee autorizacion requerida"} });
  }

  try {
    const payload = jwt.verify(token, "contraseniarandom");
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ errors: {userError: "No posee permisos correctos"} });
  }
};

export const verifyAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.user.id);

  if (!user) {
    return res.status(401).json({ errors: {userError: "Usuario no encontrado"} });
  }
  
  if (user.role !== "Admin" && user.role !== "Super") {
    return res.status(403).json({ errors: {userError: "Acceso denegado"} });
  }
  
  next();
};

export const verifySuper = async (req, res, next) => {
  const user = await User.findByPk(req.user.id);

  if (!user) {
    return res.status(401).json({ errors: {userError: "Usuario no encontrado"} });
  }
  
  if (user.role !== "Super") {
    return res.status(403).json({ errors: {userError: "Acceso denegado"} });
  }

  next();
};