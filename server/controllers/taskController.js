const Task = require("../model/task");

// Create a task
const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({
                message: "Task title is required"
            });
        }

        const task = await Task.create({
            title: title.trim(),
            description: description || "",
            status: status || "todo",
            userId: req.user.id
        });

        res.status(201).json({
            message: "Task created successfully",
            task
        });
    } catch (error) {
        res.status(500).json({ message: "Could not create task" });
    }
};

// Get all tasks belonging to the logged-in user
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id })
            .sort({ createdAt: -1 });

        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ message: "Could not fetch tasks" });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const updates = {};

        if (title !== undefined) {
            if (!title.trim()) {
                return res.status(400).json({
                    message: "Task title cannot be empty"
                });
            }
            updates.title = title.trim();
        }

        if (description !== undefined) updates.description = description;

        if (status !== undefined) {
            if (!["todo", "in-progress", "done"].includes(status)) {
                return res.status(400).json({
                    message: "Invalid task status"
                });
            }
            updates.status = status;
        }

        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            updates,
            { new: true, runValidators: true }
        );

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task updated successfully",
            task
        });
    } catch (error) {
        res.status(500).json({ message: "Could not update task" });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });

        if (!task) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({
        message: "Could not update task",
        error: error.message
    });
}
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask
};