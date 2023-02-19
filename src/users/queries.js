const getUserSession = "SELECT * FROM session WHERE sid = '$1'";
const deleteSession = "DELETE FROM session WHERE sid = '$1'";
const getAllUsers = "SELECT * FROM users";
const signup = "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)";
const login = "SELECT * from users WHERE email = $1";
const checkEmailIfExist = "SELECT * FROM users WHERE email = $1";
const getAllUsersWithLogs = "SELECT * FROM user_logs";

module.exports = {
    getAllUsers,
    checkEmailIfExist,
    signup,
    login,
    getAllUsersWithLogs,
    getUserSession,
    deleteSession
}