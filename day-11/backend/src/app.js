const express = require('express');
require('dotenv').config()
const todo = require('./models/todo.model.js');
const morgan = require('morgan');
const cors = require('cors');
const moment = require('moment-timezone');

const app = express()
moment().tz("Asia/Kolkata").toDate();

app.use(express.json());
app.use(cors())
app.use(morgan('dev'))
app.use(express.static('public'))


app.get('/api/todo', async (req, res) => {
    const data = await todo.find()
    return res.status(200).json({
        message: 'todo fetch successfully',
        todo: data
    })
})

app.post('/api/todo', async (req, res) => {
    const { title, description } = req.body;
    const data = await todo.create({ title, description })
    return res.status(201).json({
        message: 'todo create successfully',
        todo: data
    })
})

app.get('/api/todo/:id', async (req, res) => {
    const { id } = req.params;
    const data = await todo.findById(id)
    return res.status(200).json({
        message: 'todo fetch successfully',
        todo: data
    })
})

app.delete('/api/todo/:id', async (req, res) => {
    const { id } = req.params;
    const data = await todo.findByIdAndDelete(id)
    return res.status(204).json({
        message: 'todo deleted successfully',
        todo: data
    })
})

app.patch('/api/todo/:id', async (req, res) => {
    const { id } = req.params;
    const todoItem = await todo.findById(id);
    todoItem.completed = !todoItem.completed
    await todoItem.save()
    return res.status(200).json({
        message: 'todo completed successfully',
    })
})
app.put('/api/todo/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const todoItem = await todo.findByIdAndUpdate(id, { title, description });
    return res.status(200).json({
        message: 'todo updated successfully',
        todo: todoItem
    })
})



module.exports = app