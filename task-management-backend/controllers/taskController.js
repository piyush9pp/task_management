const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const { title, description, due_date, priority } = req.body;
        const task = await Task.create({ title, description, due_date, priority });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const task = await Task.findByPk(id);
        if (!task) return res.status(404).json({ error: "Task not found" });

        task.status = status;
        await task.save();
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const { priority, dueSoon } = req.query;
        let where = {};

        if (priority) where.priority = priority;
        if (dueSoon) where.due_date = { [Op.lte]: new Date(new Date().setDate(new Date().getDate() + 3)) };

        const tasks = await Task.findAll({ where });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
