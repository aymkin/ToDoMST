import { types } from "mobx-state-tree";

export const Todo = types
  .model("Todo", {
    id: types.optional(types.number, () => Math.random()),
    title: types.string,
    finished: false
  })
  .actions(self => ({
    toggle() {
      self.finished = !self.finished;
    }
  }));

export const TodoStore = types
  .model("TodoStore", {
    todos: types.array(Todo)
  })
  .views(self => ({
    get unfinishedTodoCount() {
      return self.todos.filter(todo => !todo.finished).length;
    }
  }))
  .actions(self => ({
    addTodo(title) {
      self.todos.push({ title });
    },
    removeTodo(id) {
      console.log('--- self.todos ---', self.todos)
      console.log('--- self.todos.filter(t => t.id !== id) ---', self.todos.filter(t => t.id !== id))
      self.todos = [...self.todos.filter(t => t.id !== id)]
    },
    removeAllTodos() {
      self.todos.length = 0
    }
  }));
