const express = require('express');
const todoRoutes = require('./src/todo/routes');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Hello world!");
});

app.use('/api/v1/todos', todoRoutes);

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})