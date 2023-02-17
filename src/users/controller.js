const pool = require('../../db');
const query = require('./queries');
const bcrypt = require('bcrypt');


const getAllUsers = (req,res) => {
    pool.query(query.getAllUsers, (err,results) =>{
        if (err) throw err;
        res.status(200).json(results.rows);
    })
}

const signup = async(req,res) => {
    const {email, password, role} = req.body;
    const hashedPassword = await bcrypt.hashSync(password, 10);
        pool.query(query.checkEmailIfExist,[email], (err,results) => {
            if(results.rows.length){
                res.send("email already exists.");
                return;
            }
            pool.query(query.signup, [email,hashedPassword,role], (err,results) =>{
                res.status(201).send("Successfully registered");
            });
        });
}

const login = (req, res) => {
    const {email} = req.body;
    pool.query(query.login, [email], (err, results) => {
        if(!results.rows.length){
            res.send("User doesn't exists");
        }
    });
}

module.exports = {
    getAllUsers,
    signup,
    login
}