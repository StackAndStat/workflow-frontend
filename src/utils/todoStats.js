const getTodoStats = (todos) => ({
  total: todos.length,
  todo: todos.filter((t) => t.status === "todo").length,
  inProgress: todos.filter((t) => t.status === "in-progress").length,
  completed: todos.filter((t) => t.status === "completed").length,
});

export { getTodoStats };
