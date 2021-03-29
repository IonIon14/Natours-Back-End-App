const express=require('express');
const userController = require('../controllers/userController');
const Router = express.Router();

Router
.route('/')
.get(userController.getUsers)
.post(userController.addUser);

Router
.route('/:id')
.get(userController.getUser)
.patch(userController.changeUser)
.delete(userController.deleteUser);

module.exports = Router;