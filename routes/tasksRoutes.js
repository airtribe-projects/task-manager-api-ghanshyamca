
const { getAllTasks, getATaskById, createATask, deleteATask, updateATask, getATaskByPriority } = require('../controllers/tasksController');
const { validateTask } = require('../middlewares/validationMiddleware');
const express = require('express');
const router = express.Router();


router.get("/", getAllTasks)

router.get("/:id", getATaskById)

router.get("/priority/:level", getATaskByPriority)

router.post("/", validateTask, createATask)

router.put("/:id", validateTask, updateATask)

router.delete("/:id", deleteATask)

module.exports = router;