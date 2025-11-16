import { useTask } from "../Context/TaskContext";
import TodoCard from "./TodoCard";
import styles from "../styles/Completed.module.css";

function Completed() {
  const {
    state: { todos },
  } = useTask();
  const completedTodos = todos.filter((todo) => todo.status === "completed");

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Completed Tasks</h1>
        <div className={styles.completedCount}>
          {completedTodos.length} completed
        </div>
      </div>

      {completedTodos.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>✅</div>
          <h3 className={styles.emptyStateTitle}>No completed tasks yet</h3>
          <p className={styles.emptyStateText}>
            Complete some tasks to see them here
          </p>
        </div>
      ) : (
        <div className={styles.todoGrid}>
          {completedTodos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Completed;
