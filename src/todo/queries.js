const getTodos ="SELECT * FROM todos WHERE uid = $1";
const getTodoById = "SELECT * FROM todos WHERE id = $1";
const checkTodoIfExists = "SELECT t FROM todos t WHERE t.name = $1"
const createTodo = "INSERT INTO todos (name, done, language,uid) VALUES($1, $2, $3,$4)";
const deleteTodo = "DELETE FROM todos WHERE id = $1";
const updateTodo = "UPDATE todos SET name=$1, done=$2, language=$3 WHERE id = $4";

module.exports = {
    getTodos,
    getTodoById,
    checkTodoIfExists,
    createTodo,
    deleteTodo,
    updateTodo
}