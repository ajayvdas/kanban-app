const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ boardId: req.params.boardId }).sort({ order: 1 });

        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.createTask = async (req, res) => {
    try {
        const { boardId, title, description, status } = req.body;
        // Get highest order to append to end
        const lastTask = await Task.findOne({ boardId, status }).sort({ order: -1 });
        const order = lastTask ? lastTask.order + 1 : 0;

        const newTask = new Task({
            boardId,
            title,
            description,
            status,
            order,
        });
        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { title, description, status, order } = req.body;
        let task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        task.title = title || task.title;
        task.description = description || task.description;
        task.status = status || task.status;
        if (order !== undefined) task.order = order;

        await task.save();
        res.json(task);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        await task.deleteOne();
        res.json({ message: "Task removed" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
