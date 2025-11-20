import TodoCard from "./TodoCard";
import EmptyTodo from "./EmptyTodo";

const TodoList = ({ todos }) => {
  if (todos.length === 0) return <EmptyTodo />;

  return (
    <div>
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
