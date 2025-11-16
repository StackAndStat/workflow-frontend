import { useState } from "react";
import styles from "../styles/TodoModal.module.css";

const TodoModal = ({ todo, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    todo || {
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      category: "Personal",
      due_date: "",
    }
  );

  const isoDate = formData?.due_date;
  const dateValue = isoDate?.split("T")[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className={styles.modal} onClick={() => onClose(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>{todo ? "Edit Task" : "New Task"}</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Title</label>
            <input
              type="text"
              className={styles.input}
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              placeholder="Enter task title"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Enter task description"
            />
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Status</label>
              <select
                className={styles.select}
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option className={styles.option} value="todo">
                  To Do
                </option>
                <option className={styles.option} value="in-progress">
                  In Progress
                </option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Priority</label>
              <select
                className={styles.select}
                value={formData.priority}
                onChange={(e) =>
                  setFormData({ ...formData, priority: e.target.value })
                }
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Category</label>
              <select
                className={styles.select}
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Meetings">Meetings</option>
                <option value="Documentation">Documentation</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Due Date</label>
              <input
                type="date"
                className={styles.input}
                value={dateValue}
                onChange={(e) =>
                  setFormData({ ...formData, due_date: e.target.value })
                }
              />
            </div>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.buttonSecondary}
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
            <button type="submit" className={styles.buttonPrimary}>
              {todo ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoModal;
