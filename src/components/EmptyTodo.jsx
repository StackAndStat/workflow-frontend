import { useTodoRender } from "../hooks/useTodoRender";
import TodoModal from "./TodoModal";
import styles from "../styles/EmptyTodo.module.css";

const EmptyTodo = ({
  message = "No tasks yet",
  description = "Create your first task to get started!",
}) => {
  const { openModal, showModal, closeModal, handleAddTodo } = useTodoRender();

  return (
    <>
      <div className={styles.emptyState}>
        <div className={styles.emptyIcon}>📋</div>
        <h3 className={styles.emptyTitle}>{message}</h3>
        <p className={styles.emptyDescription}>{description}</p>
      </div>

      <button
        className={styles.addButton}
        title="Add new task"
        onClick={openModal}
      >
        +
      </button>
      {showModal && <TodoModal onClose={closeModal} onSave={handleAddTodo} />}
    </>
  );
};

export default EmptyTodo;
