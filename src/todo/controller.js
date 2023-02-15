const pool = require('../../db');
const query = require('./queries');

const getTodos=(req,res) => {
    pool.query(query.getTodos, (err,results) =>{
        if (err) throw err;
        res.status(200).json(results.rows);
    });
}

const getTodoById =(req,res) => {
    let todoId = +req.params.id;
    pool.query(query.getTodoById,[todoId],(err,results) => {
        if (err) throw err;
        res.status(200).json(results.rows);
    })
}

const createTodo = (req,res) => {
    const {name, done, language} = req.body;
    pool.query(query.checkTodoIfExists, [name], (err,results)=>{
        if(results.rows.length){
            res.send("Todo already exists.");
            return;
        }
        pool.query(query.createTodo, [name,done,language], (err, results) => {
            if (err) throw err;
            res.status(201).send("successfully added todo");
        });
    });
}

const deleteTodo = (req,res) => {
    const todoId = +req.params.id;
    pool.query(query.getTodoById, [todoId], (err, results) => {
      const noTodoFound = !results.rows.length;
      if(noTodoFound){
        res.send("Todo does not exist");
      }
      pool.query(query.deleteTodo, [todoId], (err,results) => {
        if (err) throw err;
        res.status(200).send("successfully removed todo");
      });
    });
}

const updateTodo = (req,res) =>{
    const todoId = +req.params.id;
    const {name, done, language} = req.body;
    console.log(req.body, "todoId: "+todoId);
    pool.query(query.updateTodo, [name,done,language,todoId], (err,results)=>{
        if (err) throw err;
        res.status(200).send("successfully updated todo");
    })
}

module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    deleteTodo,
    updateTodo
}