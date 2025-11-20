import { useState } from "react";
import { useTodoRender } from "../hooks/useTodoRender";
import { useDashboard } from "../hooks/useDashboard";
import { useTask } from "../Context/TaskContext";
import TodoCard from "./TodoCard";
import AuthError from "./AuthError";
import Loader from "./Loader";
import styles from "../styles/AllTask.module.css";
import AddTodoModal from "./AddTodoModal";
// import TodoModal from "./TodoModal";

function AllTask() {
  const {
    state: { status, errorMessage },
  } = useTask();
  useDashboard();

  const {
    searchQuery,
    filter,
    filteredTodos,
    handleSearchChange,
    handleStatusChange,
    handlePriorityChange,
    handleCategoryChange,
    handleAddTodo,
  } = useTodoRender();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  if (status === "loading") return <Loader variant="pulse" />;

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>All Tasks</h1>
      </div>

      <div className={styles.filterSection}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="🔍 Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <select
          className={styles.select}
          value={filter.status}
          onChange={handleStatusChange}
        >
          <option value="all">Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select
          className={styles.select}
          value={filter.priority}
          onChange={handlePriorityChange}
        >
          <option value="all">Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          className={styles.select}
          value={filter.category}
          onChange={handleCategoryChange}
        >
          <option value="all">Categories</option>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Development">Development</option>
          <option value="Design">Design</option>
          <option value="Meetings">Meetings</option>
          <option value="Documentation">Documentation</option>
        </select>
      </div>

      {errorMessage && <AuthError />}

      {filteredTodos.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>📭</div>
          <h3>No tasks found</h3>
          <p>Try adjusting your filters or create a new task</p>
        </div>
      ) : (
        <div className={styles.todoGrid}>
          {filteredTodos.map((todo) => (
            <TodoCard key={todo.id} todo={todo} />
          ))}
        </div>
      )}

      <button
        className={styles.addButton}
        title="Add new task"
        onClick={() => setIsAddModalOpen(true)}
      >
        +
      </button>

      <AddTodoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={(data) => handleAddTodo(data, () => setIsAddModalOpen(false))}
      />
    </div>
  );
}

export default AllTask;
