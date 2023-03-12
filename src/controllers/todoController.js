const Todo = require("../model/Todo");

const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!id) res.status(400).json({ error: "Id is required!" });

  const todo = await Todo.findOne({ _id: id }).exec();

  if (!todo) return res.status(404).json({ error: "Todo not found!" });

  res.json(todo);
};

const getTodos = async (req, res) => {
  const { dueDate, completed } = req.query;

  const query = {};

  if (dueDate) query.dueDate = { $eq: dueDate };
  if (completed) query.completed = completed;

  const todos = await Todo.find(query);

  res.json(todos);
};

const createTodo = async (req, res) => {
  const { title, description, dueDate } = req.body;
  const requiredFields = {
    title: title || null,
    description: description || null,
    dueDate: dueDate || null,
  };

  const errors = {};

  for (const field in requiredFields) {
    if (!requiredFields[field]) {
      errors[field] = `${field} is required!`;
    }
  }

  if (Object.keys(errors).length) return res.status(400).json({ errors });

  const todo = await Todo.create({
    title,
    description,
    dueDate,
    createdAt: new Date(),
  });

  return res.status(201).json(todo);
};

const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, completed } = req.body;

  if (!id) return res.status(400).json({ error: "Id is required!" });

  const todo = await Todo.findOne({ _id: id }).exec();

  if (!todo) return res.status(204).json({ error: "Todo not found!" });

  if (title) todo.title = title;
  if (dueDate) todo.dueDate = dueDate;
  if (completed) todo.completed = completed;
  if (description) todo.description = description;

  todo.updatedAt = new Date();

  const result = await todo.save();

  res.json(result);
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "Id is required!" });

  const todo = await Todo.findOne({ _id: id }).exec();

  if (!todo) return res.status(204).json({ error: "Todo not found!" });

  const result = await Todo.deleteOne({ _id: id });

  res.json(result);
};

module.exports = {
  getTodo,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
