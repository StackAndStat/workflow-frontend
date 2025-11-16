import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const TaskContext = createContext();

const getInitialState = () => {
  const storedUser = localStorage.getItem("user");
  const storedAuth = localStorage.getItem("isAuthenticated");
  const storedPage = localStorage.getItem("page");

  return {
    user: storedUser ? JSON.parse(storedUser) : null,
    errorMessage: "",
    isAuthenticated: storedAuth === "true",
    activePage: storedPage ? storedPage : "",
    todos: [],
    searchQuery: "",
    filter: { status: "all", priority: "all", category: "all" },
  };
};

const initialValue = getInitialState();

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("isAuthenticated", true);

      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        activePage: "dashboard",
      };

    case "SET_ERROR":
      return {
        ...state,
        errorMessage: action.payload,
      };

    case "CLEAR_ERROR":
      return {
        ...state,
        errorMessage: "",
      };

    case "LOGOUT":
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("page");

      return {
        ...state,
        user: null,
        isAuthenticated: false,
        todos: [],
        errorMessage: "",
        activePage: "",
      };

    case "SET_ACTIVE":
      localStorage.setItem("page", action.payload);
      return {
        ...state,
        activePage: action.payload,
      };

    case "SET_TODOS":
      return {
        ...state,
        todos: action.payload,
      };

    case "SET_UPDATED_TODO":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? action.payload : todo
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case "SET_SEARCH":
      return {
        ...state,
        searchQuery: action.payload,
      };

    case "SET_FILTER":
      return {
        ...state,
        filter: { ...state.filter, ...action.payload },
      };

    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    default:
      return state;
  }
}

function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialValue);
  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

function useTask() {
  const context = useContext(TaskContext);

  if (context === undefined) {
    throw new Error("useTask must be used within TaskProvider");
  }

  return context;
}

export { useTask, TaskProvider };
