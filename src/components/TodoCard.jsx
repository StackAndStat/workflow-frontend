import { priorityColors, statusColors } from "../data/todoConstants";
import { useTodoCard } from "../hooks/useTodoCard";
import TodoModal from "./TodoModal";
import styles from "../styles/TodoCard.module.css";

const TodoCard = ({ todo }) => {
  const {
    showModal,
    showDeleteConfirm,
    todoToDelete,
    setShowModal,
    handleSave,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleMarkComplete,
  } = useTodoCard();

  return (
    <>
      <div className={styles.todoCard}>
        <div className={styles.todoHeader}>
          <div className={styles.todoContent}>
            <h3 className={styles.todoTitle}>{todo.title}</h3>
            <p className={styles.todoDescription}>{todo.description}</p>
          </div>
          <div className={styles.actionButtons}>
            {todo.status !== "completed" && (
              <button
                className={`${styles.iconButton} ${styles.completeButton}`}
                title="Mark Complete"
                onClick={() => handleMarkComplete(todo)}
              >
                ✅
              </button>
            )}
            <button
              className={styles.iconButton}
              title="Edit"
              onClick={() => setShowModal(true)}
            >
              ✏️
            </button>
            <button
              className={`${styles.iconButton} ${styles.deleteButton}`}
              title="Delete"
              onClick={() => handleDeleteClick(todo)}
            >
              🗑️
            </button>
          </div>
        </div>

        <div className={styles.todoMeta}>
          <span
            className={`${styles.badge} ${styles[statusColors[todo.status]]}`}
          >
            {todo.status === "in-progress"
              ? "In Progress"
              : todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
          </span>
          <span
            className={`${styles.badge} ${
              styles[priorityColors[todo.priority]]
            }`}
          >
            {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
          </span>
          <span className={`${styles.badge} ${styles.category}`}>
            {todo.category}
          </span>
          {todo.due_date && (
            <span className={styles.dueDate}>
              📅 {new Date(todo.due_date).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className={styles.confirmationOverlay}>
          <div className={styles.confirmationModal}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete "{todoToDelete?.title}"?</p>
            <div className={styles.confirmationButtons}>
              <button
                className={styles.cancelButton}
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>
              <button
                className={styles.confirmButton}
                onClick={handleDeleteConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <TodoModal todo={todo} onClose={setShowModal} onSave={handleSave} />
      )}
    </>
  );
};

export default TodoCard;
