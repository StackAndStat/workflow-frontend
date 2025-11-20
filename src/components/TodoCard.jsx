import { priorityColors, statusColors } from "../data/todoConstants";
import { useTodoCard } from "../hooks/useTodoCard";
import TodoModal from "./TodoModal";
import styles from "../styles/TodoCard.module.css";

const TodoCard = ({ todo }) => {
  const {
    isEditModalOpen,
    showDeleteConfirm,
    todoToDelete,
    setIsEditModalOpen,
    handleSave,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleMarkComplete,
  } = useTodoCard();

  return (
    <>
      <div className={styles.todoCard}>
        {/* Header: Title and Action Buttons */}
        <div className={styles.todoHeader}>
          <h3 className={styles.todoTitle}>{todo.title}</h3>
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
              onClick={() => setIsEditModalOpen(true)}
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

        {/* Description: Full width below header */}
        {todo.description && (
          <p className={styles.todoDescription}>{todo.description}</p>
        )}

        {/* Meta Information: Badges and Date */}
        <div className={styles.todoMeta}>
          <div className={styles.badges}>
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
          </div>
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

      {isEditModalOpen && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <TodoModal
              todo={todo}
              onClose={() => setIsEditModalOpen(false)}
              onSave={handleSave}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TodoCard;
