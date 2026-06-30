import { Question } from "../models/Question.js";
import { Item } from "../models/Item.js";
import { User } from "../models/User.js";

export const findQuestionsByItem = async (req, res) => {
  const { itemId } = req.params;

  const item = await Item.findByPk(itemId);

  if (!item) {
    return res.status(404).json({ errors: {itemError: "Producto no encontrado."} });
  }

  const questions = await Question.findAll({
    where: { itemId },
    include: { model: User, attributes: ["id", "email", "name"] }
  });

  res.json(questions);
};

export const createQuestion = async (req, res) => {
  const userId = req.user.id;

  const { itemId, question } = req.body;

  if (!question || question.trim() === "") {
    return res.status(400).json({ errors: {question: "La pregunta no puede estar vacía."} });
  }

  const item = await Item.findByPk(itemId);

  if (!item) {
    return res.status(404).json({ errors: {itemError: "Producto no encontrado."} });
  }

  const newQuestion = await Question.create({ itemId, userId, question });

  const newQuestionUser = await Question.findByPk(
    newQuestion.id,
    {include: { model: User, attributes: ["id", "email", "name"] }}
  );

  res.json(newQuestionUser);
};

export const answerQuestion = async (req, res) => {
  const { id } = req.params;
  const { answer } = req.body;

  if (!answer || answer.trim() === "") {
    return res.status(400).json({ errors: {answer: "La respuesta no puede estar vacía."} });
  }

  const question = await Question.findByPk(id);

  if (!question) {
    return res.status(404).json({ errors: {questionError: "Pregunta no encontrada."} });
  }

  await question.update({ answer });

  const updatedQuestion = await Question.findByPk(
    question.id,
    {include: { model: User, attributes: ["id", "email", "name"] }}
  );

  res.json(updatedQuestion);
};

export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const user = await User.findByPk(userId);

  if (!user) {
    return res.status(401).json({ errors: {userError: "Usuario no encontrado"} });
  }

  const question = await Question.findByPk(id);

  if (!question) {
    return res.status(404).json({ errors: {questionError: "Pregunta no encontrada."} });
  }

  if (question.userId !== userId && user.role !== "Admin" && user.role !== "Super") {
    return res.status(404).json({ errors: {userError: "No tiene permisos para eliminar."} });
  }

  await question.destroy();
  
  res.json(id);
};