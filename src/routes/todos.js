const express = require('express')

const todoController = require('../controllers/todoController')

const router = express.Router()

router.route('/').get(todoController.getTodos).post(todoController.createTodo)

router
    .route('/:id')
    .get(todoController.getTodo)
    .put(todoController.updateTodo)
    .delete(todoController.deleteTodo)

module.exports = router
