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

const getUserSession = async(sessID) => {
    try{
        const res = await pool.query(query.getUserSession, [sessID]);
        return res.rows[0].sess;
    }catch(e){
        return e.stack;
    }
}

const getTodos= async (req,res) => {
    const userInfo = await getUserSession(req.sessionID);
    await pool.query(query.getTodos,[userInfo.passport.user.id], (err,results) =>{
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
    let userInfo = await getUserSession(req.sessionID);
    let {deleted_todos} = await updateUserLogs(userInfo.passport.user.id);
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
    pool.query(logQuery.logDeleteTodo, [deleted_todos + 1, userInfo.passport.user.id]);
}

const updateTodo = async (req,res) =>{
    const todoId = +req.params.id;
    const {name, done, language} = req.body;
    const userInfo = await getUserSession(req.sessionID);
    let {translated_todos} = await updateUserLogs(userInfo.passport.user.id);
    pool.query(query.updateTodo, [name,done,language,todoId], (err,results)=>{
        if (err) throw err;
        res.status(200).send("successfully updated todo");
    })
    pool.query(logQuery.logUpdateTodo, [translated_todos + 1, userInfo.passport.user.id]);
}

module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    deleteTodo,
    updateTodo
}