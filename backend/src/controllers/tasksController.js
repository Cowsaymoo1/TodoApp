import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        console.log('Error fetching tasks:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const newTask = new Task({ title });
        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.log('Error create tasks:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const updateTask = async (req, res) => {
    try {
        const { title, status, completedAt } = req.body;
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, status, completedAt },
            { new: true }
        );
        if (!updateTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updateTask);
    } catch (error) {
        console.log('Error updating task:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.log('Error deleting task:', error);
        res.status(500).json({ message: 'Server error' });
    }
}