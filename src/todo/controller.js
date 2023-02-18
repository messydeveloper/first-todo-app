const pool = require('../../db');
const query = require('./queries');
const logQuery = require('../../log_queries');

const updateUserLogs = async (userID) => {
    try{
        const res = await pool.query(logQuery.getUserLogs, [userID]);
        return res.rows[0]
    }catch(e){
        return e.stack;
    }
}

const getTodos=(req,res) => {
    const id = req.session.passport.user.id;
    pool.query(query.getTodos,[id], (err,results) =>{
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

const createTodo = async (req,res) => {
    const {name, done, language, uid} = req.body;
    let {created_todos} = await updateUserLogs(uid);
    pool.query(query.checkTodoIfExists, [name, uid], (err,results)=>{
        if(results.rows.length){
            res.send("Todo already exists.");
            return;
        }
        pool.query(query.createTodo, [name,done,language, uid.toString()], (err, results) => {
            if (err) throw err;
            res.status(201).send("successfully added todo");
        });
    });
    pool.query(logQuery.logCreateTodo, [created_todos + 1, uid]);
}

const deleteTodo = async (req,res) => {
    const todoId = +req.params.id;
    const {id} = req.session.passport.user;
    let {deleted_todos} = await updateUserLogs(id);
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
    pool.query(logQuery.logDeleteTodo, [deleted_todos + 1, id]);
}

const updateTodo = async (req,res) =>{
    const todoId = +req.params.id;
    const {name, done, language} = req.body;
    const {id} = req.session.passport.user;
    let {translated_todos} = await updateUserLogs(id);
    pool.query(query.updateTodo, [name,done,language,todoId], (err,results)=>{
        if (err) throw err;
        res.status(200).send("successfully updated todo");
    })
    pool.query(logQuery.logUpdateTodo, [translated_todos + 1, id]);
}

module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    deleteTodo,
    updateTodo
}