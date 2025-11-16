import { useEffect } from "react";
import { useTask } from "../Context/TaskContext";

const AuthInitializer = ({ children }) => {
  const { dispatch } = useTask();

  useEffect(() => {
    const initializeAuth = () => {
      const storedUser = localStorage.getItem("user");
      const storedAuth = localStorage.getItem("isAuthenticated");

      if (storedAuth === "true" && storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          dispatch({
            type: "LOGIN_SUCCESS",
            payload: userData,
          });
        } catch (error) {
          console.error("Error parsing stored user data:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("isAuthenticated");
        }
      }
    };

    initializeAuth();
  }, [dispatch]);

  return children;
};

export default AuthInitializer;
