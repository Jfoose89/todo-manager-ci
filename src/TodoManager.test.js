const TodoManager = require("./TodoManager");

describe("TodoManager", () => {
  let manager;

  beforeEach(() => {
    manager = new TodoManager();
  });

  describe("addTodo", () => {
    test("adds a todo with text and default completed=false", () => {
      const todo = manager.addTodo("Buy milk");
      expect(todo.id).toBe(1);
      expect(todo.text).toBe("Buy milk");
      expect(todo.completed).toBe(false);
      expect(manager.getTodos()).toHaveLength(1);
    });

    test("rejects empty or invalid text", () => {
      expect(() => manager.addTodo("  ")).toThrow();
      expect(() => manager.addTodo("")).toThrow();
      expect(() => manager.addTodo(null)).toThrow();
    });
  });

  describe("getTodos", () => {
    test("returns all todos", () => {
      manager.addTodo("A");
      manager.addTodo("B");
      expect(manager.getTodos()).toHaveLength(2);
    });

    test("returns empty array when no todos", () => {
      expect(manager.getTodos()).toEqual([]);
    });
  });

  describe("getTodoById", () => {
    test("returns todo by id", () => {
      const todo = manager.addTodo("Task");
      expect(manager.getTodoById(todo.id)).toEqual(todo);
    });

    test("throws for invalid id", () => {
      expect(() => manager.getTodoById(999)).toThrow("Todo not found");
    });
  });

  describe("toggleCompleted", () => {
    test("toggles completed state", () => {
      const todo = manager.addTodo("Task");
      manager.toggleCompleted(todo.id);
      expect(manager.getTodoById(todo.id).completed).toBe(true);
      manager.toggleCompleted(todo.id);
      expect(manager.getTodoById(todo.id).completed).toBe(false);
    });
  });

  describe("removeTodo", () => {
    test("removes todo by id", () => {
      const t1 = manager.addTodo("A");
      const t2 = manager.addTodo("B");
      manager.removeTodo(t1.id);
      expect(manager.getTodos()).toEqual([t2]);
    });

    test("throws for invalid id", () => {
      expect(() => manager.removeTodo(999)).toThrow("Todo not found");
    });
  });

  describe("clearCompleted", () => {
    test("removes only completed todos", () => {
      const t1 = manager.addTodo("A");
      const t2 = manager.addTodo("B");
      manager.toggleCompleted(t1.id);
      const remaining = manager.clearCompleted();
      expect(remaining).toHaveLength(1);
      expect(remaining[0].id).toBe(t2.id);
    });
  });

  describe("updateTodo", () => {
    test("updates todo text", () => {
      const todo = manager.addTodo("Old");
      manager.updateTodo(todo.id, "New");
      expect(manager.getTodoById(todo.id).text).toBe("New");
    });

    test("rejects empty text", () => {
      const todo = manager.addTodo("Old");
      expect(() => manager.updateTodo(todo.id, "  ")).toThrow();
    });
  });
});
