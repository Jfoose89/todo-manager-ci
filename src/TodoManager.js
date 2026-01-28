class TodoManager {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }

  addTodo(text) {
    if (!text || typeof text !== "string" || text.trim() === "") {
      throw new Error("Todo text must be a non-empty string");
    }

    const todo = {
      id: this.nextId++,
      text: text.trim(),
      completed: false,
    };

    this.todos.push(todo);
    return todo;
  }

  getTodos() {
    return this.todos;
  }

  getTodoById(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    return todo;
  }

  toggleCompleted(id) {
    const todo = this.getTodoById(id);
    todo.completed = !todo.completed;
    return todo;
  }

  removeTodo(id) {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error("Todo not found");
    }
    const [removed] = this.todos.splice(index, 1);
    return removed;
  }

  clearCompleted() {
    this.todos = this.todos.filter((t) => !t.completed);
    return this.todos;
  }

  updateTodo(id, text) {
    if (!text || typeof text !== "string" || text.trim() === "") {
      throw new Error("Todo text must be a non-empty string");
    }
    const todo = this.getTodoById(id);
    todo.text = text.trim();
    return todo;
  }
}

module.exports = TodoManager;
