import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProvider } from "./Context/TaskContext";
import AuthInitializer from "./hooks/AuthInitializer";
import AuthPage from "./pages/AuthPage";
import AppLayout from "./pages/AppLayout";
import Dashboard from "./components/Dashboard";
import AllTask from "./components/AllTask";
import Active from "./components/Active";
import Completed from "./components/Completed";
import PageNotFound from "./components/PageNotFound";
import TodoPage from "./components/Todo";
import { ModalProvider } from "./Context/ModalContext";

function App() {
  return (
    <TaskProvider>
      <ModalProvider>
        <AuthInitializer>
          <Router>
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="allTask" element={<AllTask />} />
                <Route path="todo" element={<TodoPage />} />
                <Route path="active" element={<Active />} />
                <Route path="completed" element={<Completed />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Router>
        </AuthInitializer>
      </ModalProvider>
    </TaskProvider>
  );
}

export default App;
