const getTodos ="SELECT * FROM todo";
const getTodoById = "SELECT * FROM todo WHERE id = $1";

module.exports = {
    getTodos,
    getTodoById
}