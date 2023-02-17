const getTodos ="SELECT * FROM todo";
const getAllUsers = "SELECT * FROM users";
const signup = "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)";
const login = "SELECT * from users WHERE email = $1";
const checkEmailIfExist = "SELECT * FROM users WHERE email = $1";

module.exports = {
    getAllUsers,
    checkEmailIfExist,
    signup,
    login
}