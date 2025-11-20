import { useState } from "react";
import { useTask } from "../Context/TaskContext";

const baseURL = import.meta.env.VITE_URL;

const useTodoCard = () => {
  const { dispatch } = useTask();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  const handleSave = async (updatedTodo) => {
    const { id, title, description, category, status, priority, due_date } =
      updatedTodo;

    dispatch({ type: "SET_STATUS", payload: "loading" });
    try {
      const res = await fetch(`${baseURL}/edit/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          category,
          status,
          priority,
          due_date,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch({ type: "SET_ERROR", payload: data.error });
        return;
      }
      dispatch({ type: "SET_UPDATED_TODO", payload: data.data });
      dispatch({ type: "SET_STATUS", payload: "active" });
      setIsEditModalOpen(false);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error });
      dispatch({ type: "SET_STATUS", payload: "error" });
    }
  };

  const handleDeleteClick = (todo) => {
    setTodoToDelete(todo);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!todoToDelete) return;

    dispatch({ type: "SET_STATUS", payload: "loading" });
    try {
      const { id } = todoToDelete;
      const res = await fetch(`${baseURL}/delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: "SET_ERROR", payload: data.error });
        return;
      }

      dispatch({ type: "DELETE_TODO", payload: id });
      dispatch({ type: "SET_STATUS", payload: "active" });
      setShowDeleteConfirm(false);
      setTodoToDelete(null);
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error });
      dispatch({ type: "SET_STATUS", payload: "error" });
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setTodoToDelete(null);
  };

  const handleMarkComplete = async (todo) => {
    if (todo.status === "completed") return;

    const updatedTodo = {
      ...todo,
      status: "completed",
      completed_at: new Date().toISOString(),
    };

    dispatch({ type: "CLEAR_ERROR" });

    try {
      const res = await fetch(`${baseURL}/edit/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: "SET_ERROR", payload: data.error });
        return;
      }

      dispatch({ type: "SET_UPDATED_TODO", payload: data.data });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: error,
      });
    }
  };

  return {
    isEditModalOpen,
    showDeleteConfirm,
    todoToDelete,
    setIsEditModalOpen,
    handleSave,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
    handleMarkComplete,
  };
};

export { useTodoCard };
