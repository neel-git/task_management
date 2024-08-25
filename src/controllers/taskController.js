const { Task } = require("../models");
const { Op } = require("sequelize");

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, UserId: req.user.id });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { status, priority, dueDate, search } = req.query;
    const where = { UserId: req.user.id };

    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (dueDate) where.dueDate = { [Op.lte]: new Date(dueDate) };
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const tasks = await Task.findAll({ where });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const [updated] = await Task.update(req.body, {
      where: { id: req.params.id, UserId: req.user.id },
    });
    if (updated) {
      const updatedTask = await Task.findOne({ where: { id: req.params.id } });
      return res.json(updatedTask);
    }
    throw new Error("Task not found");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deleted = await Task.destroy({
      where: { id: req.params.id, UserId: req.user.id },
    });
    if (deleted) {
      return res.status(204).send();
    }
    throw new Error("Task not found");
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
