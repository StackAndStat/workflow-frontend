import { useState } from "react";
import { useTask } from "../Context/TaskContext";

export function useTodoRender() {
  const {
    state: { searchQuery, todos, filter, user },
    dispatch,
  } = useTask();

  const [showModal, setShowModal] = useState(false);

  const baseURL = import.meta.env.VITE_URL;

  // Filter logic
  const filteredTodos = todos.filter((todo) => {
    const matchesSearch =
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filter.status === "all" || todo.status === filter.status;
    const matchesPriority =
      filter.priority === "all" || todo.priority === filter.priority;
    const matchesCategory =
      filter.category === "all" || todo.category === filter.category;

    return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
  });

  // Add todo logic
  const handleAddTodo = async (todoData) => {
    const newTodo = {
      ...todoData,
      created_at: new Date().toISOString().split("T")[0],
    };
    dispatch({ type: "CLEAR_ERROR" });

    try {
      const res = await fetch(`${baseURL}/add/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch({ type: "SET_ERROR", payload: data.error });
        return;
      }

      dispatch({ type: "ADD_TODO", payload: data.data });
      setShowModal(false);
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "There was an error adding new todo",
      });
    }
  };

  // Filter handlers
  const handleSearchChange = (event) => {
    dispatch({ type: "SET_SEARCH", payload: event.target.value });
  };

  const handleStatusChange = (event) => {
    dispatch({
      type: "SET_FILTER",
      payload: { status: event.target.value },
    });
  };

  const handlePriorityChange = (event) => {
    dispatch({
      type: "SET_FILTER",
      payload: { priority: event.target.value },
    });
  };

  const handleCategoryChange = (event) => {
    dispatch({
      type: "SET_FILTER",
      payload: { category: event.target.value },
    });
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return {
    // State
    searchQuery,
    filter,
    filteredTodos,
    showModal,

    // Handlers
    handleSearchChange,
    handleStatusChange,
    handlePriorityChange,
    handleCategoryChange,
    handleAddTodo,
    openModal,
    closeModal,
  };
}
