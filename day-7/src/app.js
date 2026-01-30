const express = require('express');
const app = express();
const notemodel = require('./models/notes.models.js');
const note = require('./models/notes.models.js');
app.use(express.json());



app.get('/note', async (req, res) => {
    const data = await note.find()
    return res.status(200).json({
        message: 'data fetch successfully',
        data: data
    })
});

app.post('/note', async (req,res)=>{
    const {title, description} = req.body;
    const data = await notemodel.create({title,description})
    return res.status(201).json({
        message: 'note create successfully',
        data: data
    })
})

// app.delete('/note/:id', async (req,res)=>{
//     const id = req.params.id
//     await note.findByIdAndDelete(id)
//     return res.status(204).json({
//         message: 'note deleted successfully'
//     })
// })



module.exports = app;