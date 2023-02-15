const express = require('express');
const todoRoutes = require('./src/todo/routes');
const userRoutes = require('./src/users/routes');
const app = express();
const port = 3000;
const cors = require('cors');

var corsOptions = {
    origin: "http://localhost:4200"
}

app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Hello world!");
});

app.use('/api/v1/todos', todoRoutes);
app.use('/api/v1/users', userRoutes);

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})