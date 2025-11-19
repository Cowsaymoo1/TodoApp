import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
    const {filter = "today"} = req.query;
    const now = new Date();
    let startDate;
    
    switch(filter){
        case "today": {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        }
        case "week":{
            const mondayDate = now.getDate() - (now.getDay() -1) - (now.getDay() === 0 ? 7 : 0);
            startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
            break;
        }
        case "month": {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        }
        case "all": {
            startDate = null;
            
        }
    }

    const query = startDate ? { createdAt : {$gte: startDate}} : {};

    try {
        const result = await Task.aggregate([
            {$match: query},
            {
                $facet: {
                    tasks: [{$sort: {createdAt: -1}}],
                    activeCount: [{$match: {status: 'active'}}, {$count: 'count'}],
                    completeCount: [{$match: {status: 'complete'}}, {$count: 'count'}],
                }
            }
        ]);

        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completeCount = result[0].completeCount[0]?.count || 0;
        res.status(200).json({tasks, activeCount, completeCount});
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