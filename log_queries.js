const getUserLogs = "SELECT * FROM user_logs WHERE uid = $1";
const sendLoginDate = "INSERT INTO user_logs (uid, email, last_login) VALUES ($1,$2,$3) ON CONFLICT (email) DO UPDATE SET last_login = EXCLUDED.last_login";
const logCreateTodo = "UPDATE user_logs SET created_todos = $1 WHERE uid = $2";
const logDeleteTodo = "UPDATE user_logs SET deleted_todos = $1 WHERE uid = $2";
const logUpdateTodo = "UPDATE user_logs SET translated_todos = $1 WHERE uid = $2";



module.exports={
    getUserLogs,
    sendLoginDate,
    logCreateTodo,
    logDeleteTodo,
    logUpdateTodo
}