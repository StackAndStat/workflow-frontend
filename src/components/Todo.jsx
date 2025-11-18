import { useTask } from "../Context/TaskContext";
import { useDashboard } from "../hooks/useDashboard";
import TodoCard from "./TodoCard";
import AuthError from "./AuthError";
import Loader from "./Loader";
import styles from "../styles/TodoPage.module.css";

function TodoPage() {
  const {
    state: { todos, status, errorMessage },
  } = useTask();
  useDashboard();
  const todoTasks = todos.filter((todo) => todo.status === "todo");

  if (status === "loading") return <Loader variant="pulse" />;

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>To Do Tasks</h1>
        <div className={styles.todoCount}>{todoTasks.length} pending</div>
      </div>

      {errorMessage && <AuthError />}

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
