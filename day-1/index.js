const catme = require('cat-me');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res)=>{
    res.send(`Hello chacha! <pre>${catme()}</pre>`);
})

app.listen(port);