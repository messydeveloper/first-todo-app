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

module.exports = {
    getTodos,
    getTodoById
}