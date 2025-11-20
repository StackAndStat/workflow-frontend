import TodoModal from "./TodoModal";
import styles from "../styles/AddTodoModal.module.css";

function AddTodoModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <TodoModal onClose={onClose} onSave={onSave} />
      </div>
    </div>
  );
}

export default AddTodoModal;
