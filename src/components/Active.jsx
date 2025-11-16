import { useTask } from "../Context/TaskContext";
import TodoCard from "./TodoCard";
import styles from "../styles/Active.module.css";

function Active() {
  const {
    state: { todos },
  } = useTask();

  const activeTodos = todos.filter((todo) => todo.status === "in-progress");

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Active Tasks</h1>
        <div className={styles.activeCount}>{activeTodos.length} active</div>
      </div>

      {activeTodos.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>🎉</div>
          <h3 className={styles.emptyStateTitle}>All caught up!</h3>
          <p className={styles.emptyStateText}>
            You have no active tasks at the moment
          </p>
        </div>
      ) : (
        <div className={styles.todoGrid}>
          {activeTodos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Active;
