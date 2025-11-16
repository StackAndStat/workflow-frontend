import { useState } from "react";
import { useTask } from "../Context/TaskContext";
import { useNavigate } from "react-router-dom";

const baseUrl = import.meta.env.VITE_URL;

const useAuthForm = () => {
  const {
    state: { errorMessage },
    dispatch,
  } = useTask();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "CLEAR_ERROR" });

    const endpoint = isLogin ? "/login" : "/register";

    try {
      const res = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        dispatch({
          type: "SET_ERROR",
          payload: data.error || "Something went wrong",
        });
        return;
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
      navigate("/app", { replace: true });
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Network error. Check connection.",
      });
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    dispatch({ type: "CLEAR_ERROR" });
    setFormData({ email: "", password: "" });
  };

  return {
    isLogin,
    formData,
    errorMessage,
    handleChange,
    handleSubmit,
    toggleAuthMode,
  };
};

export { useAuthForm };
