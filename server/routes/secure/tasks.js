const router = require('express').Router(),
  {
    createTask,
    getAllTasks,
    getSpecificTask,
    updateTask,
    deleteTask
  } = require('../../controllers/tasks');

// ***********************************************//
// Create a task
// ***********************************************//
router.post('/', createTask);

// ***********************************************//
// Get a specific task
// ***********************************************//
router.get('/:id', getSpecificTask);

// ***********************************************//
// Get all tasks
// /tasks?completed=true
// /tasks?limit=10&skip=10
// /tasks?sortBy=createdAt:asc
// /tasks?sortBy=dueDate:desc
// ***********************************************//
router.get('/', getAllTasks);
// ***********************************************//
// Update a task
// ***********************************************//
router.patch('/:id', updateTask);

// ***********************************************//
// Delete a task
// ***********************************************//
router.delete('/:id', deleteTask);

module.exports = router;
