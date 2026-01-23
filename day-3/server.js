const express = require('express')

const app = express()
const PORT = 3000

//middleware
app.use(express.json())

let notes = []

// get data
app.get('/notes', (req,res)=>{
    const data = notes
    
    res.send(data)
})

//post a data
app.post('/notes', (req,res)=>{
    const data = req.body;
    notes.push(data)
    res.send('notes add successfully')
})

// delete last item from array
app.delete('/notes', (req,res)=>{
    const data = notes
    data.pop()
    res.send('data delete successfully!!')
})


app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
})