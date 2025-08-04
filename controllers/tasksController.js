const tasks = require('../models/tasksModel');
const priorityEnum = require('../constants/priority');
const { PRIORITY_VALUES } = require('../middlewares/validationMiddleware')

let nextId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

const getAllTasks = (req, res) => {
    let result = [...tasks];

    // Filtering by completed status
    if (req.query.completed !== undefined) {
        const completed = req.query.completed === 'true';
        console.log(completed)
        result = result.filter(task => task.completed === completed);
    }

    // Sorting by creation date
    if (req.query.sort === 'asc') {
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (req.query.sort === 'desc') {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.send(result)
}

const getATaskById = (req, res) => {
    const taskId = req.params.id
    const task = tasks.find(t => t.id == taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
};

const getATaskByPriority = (req, res) => {
    const priority = req.params.level

    if (!PRIORITY_VALUES.includes(priority)) {
        return res.status(400).json({
        error: `Priority must be one of: ${PRIORITY_VALUES.join(', ')}`
        });
    }
    const task = tasks.filter(t => t.priority == priority);
    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
};

const createATask = (req, res) => {
    const { title, description, completed, priority = priorityEnum.LOW } = req.body;
    const taskData = { id: nextId++, title, description, completed, priority, createdAt: new Date().toISOString() };
    tasks.push(taskData)
    res.status(201).send(taskData)
};

const deleteATask = (req,res) => {
    const taskId = req.params.id
    const taskIndex = tasks.findIndex((e) => e.id == taskId)

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    tasks.splice(taskIndex, 1);
    res.send({message: `${taskId} deleted successfully`})
};

const updateATask = (req,res) => {
    const taskId = req.params.id
    
    const taskIndex = tasks.findIndex((e) => e.id === parseInt(taskId))
    const { title, description, completed, priority } = req.body;
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks[taskIndex] = { 
        id: parseInt(taskId), 
        title, 
        description, 
        completed, 
        priority: priority || tasks[taskIndex].priority, 
        createdAt: tasks[taskIndex].createdAt, 
        updatedAt: new Date().toISOString() 
    };
    res.json(tasks[taskIndex]);
};

module.exports = {
    getAllTasks, 
    getATaskById, 
    createATask,
    deleteATask,
    updateATask,
    getATaskByPriority
};
