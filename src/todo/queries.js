const getTodos ="SELECT * FROM todo";
const getTodoById = "SELECT * FROM todo WHERE id = $1";
const checkTodoIfExists = "SELECT t FROM todo t WHERE t.name = $1"
const createTodo = "INSERT INTO todo (name, done, language) VALUES($1, $2, $3)";
const deleteTodo = "DELETE FROM todo WHERE id = $1";

module.exports = {
    getTodos,
    getTodoById,
    checkTodoIfExists,
    createTodo,
    deleteTodo
}