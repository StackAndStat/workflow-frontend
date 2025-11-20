import { useEffect } from "react";
import { useTask } from "../Context/TaskContext";

const useDashboard = () => {
  const {
    state: { user },
    dispatch,
  } = useTask();

  const baseUrl = import.meta.env.VITE_URL;

  useEffect(() => {
    const id = user?.id;

    if (!id) return;

    async function fetchTodos() {
      dispatch({ type: "CLEAR_ERROR" });
      dispatch({ type: "SET_STATUS", payload: "loading" });
      try {
        const res = await fetch(`${baseUrl}/todos/${id}`);
        const data = await res.json();

        if (!res.ok) {
          dispatch({ type: "SET_ERROR", payload: data.error });
          return;
        }

        dispatch({ type: "SET_TODOS", payload: data.data });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error });
      }
    }

    fetchTodos();
  }, [baseUrl, user, dispatch]);

  return { user };
};

export { useDashboard };
