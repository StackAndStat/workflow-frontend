import { useTask } from "../Context/TaskContext";
import TodoCard from "./TodoCard";
import styles from "../styles/TodoPage.module.css";

function TodoPage() {
  const {
    state: { todos },
  } = useTask();
  const todoTasks = todos.filter((todo) => todo.status === "todo");

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>To Do Tasks</h1>
        <div className={styles.todoCount}>{todoTasks.length} pending</div>
      </div>

      {todoTasks.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>📝</div>
          <h3 className={styles.emptyStateTitle}>No tasks to do</h3>
          <p className={styles.emptyStateText}>
            All caught up! Create new tasks to get started
          </p>
        </div>
      ) : (
        <div className={styles.todoGrid}>
          {todoTasks.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TodoPage;
