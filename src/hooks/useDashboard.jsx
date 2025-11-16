import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "../Context/TaskContext";

const useDashboard = () => {
  const {
    state: { user },
    dispatch,
  } = useTask();

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_URL;

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const { id } = user;

    async function fetchTodos() {
      dispatch({ type: "CLEAR_ERROR" });
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
  }, [baseUrl, user, dispatch, navigate]);

  return { user };
};

export { useDashboard };
