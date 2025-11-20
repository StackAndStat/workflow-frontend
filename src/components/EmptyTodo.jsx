import { useTodoRender } from "../hooks/useTodoRender";
import AddTodoModal from "./AddTodoModal";
import { useModal } from "../Context/ModalContext";
// import TodoModal from "./TodoModal";
import styles from "../styles/EmptyTodo.module.css";

const EmptyTodo = ({
  message = "No tasks yet",
  description = "Create your first task to get started!",
}) => {
  const { handleAddTodo } = useTodoRender();
  const { isAddModalOpen, setIsAddModalOpen } = useModal();
  console.log("coming from empty");

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
        onClick={() => setIsAddModalOpen(true)}
      >
        +
      </button>

      <AddTodoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={(data) => handleAddTodo(data, () => setIsAddModalOpen(false))}
      />
    </>
  );
};

export default EmptyTodo;
