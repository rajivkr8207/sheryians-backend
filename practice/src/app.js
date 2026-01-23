import express from 'express';
const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    res.send("welcome to server js");
});


export default app;