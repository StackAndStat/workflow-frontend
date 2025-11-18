import { useTask } from "../Context/TaskContext";
import { useDashboard } from "../hooks/useDashboard";
import { getTodoStats } from "../utils/todoStats";
import { getRecentTodos } from "../utils/sortedTodos";
import TodoCard from "./TodoCard";
import styles from "../styles/Dashboard.module.css";
import Loader from "./Loader";

function Dashboard() {
  const {
    state: { todos, status },
  } = useTask();
  const { user } = useDashboard();
  const stats = getTodoStats(todos);
  const recentTodos = getRecentTodos(todos, 5);

  const email = user.name;
  const username = email.split("@").at(0);

  if (status === "loading") return <Loader variant="pulse" />;

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>{username}</h1>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.total}`}>
            {stats.total}
          </div>
          <div className={styles.statLabel}>Total Tasks</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.todo}`}>
            {stats.todo}
          </div>
          <div className={styles.statLabel}>To Do</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.inProgress}`}>
            {stats.inProgress}
          </div>
          <div className={styles.statLabel}>In Progress</div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statValue} ${styles.completed}`}>
            {stats.completed}
          </div>
          <div className={styles.statLabel}>Completed</div>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Recent Tasks</h2>
      <div className={styles.todoGrid}>
        {recentTodos.map((todo) => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
    </>
  );
}

export default Dashboard;
