function getRecentTodos(todos, limit = 5) {
  if (!Array.isArray(todos)) return [];

  return [...todos]
    .filter((todo) => todo?.created_at)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, limit);
}

export { getRecentTodos };
