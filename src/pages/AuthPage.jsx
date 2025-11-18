import { useAuthForm } from "../hooks/useAuthForm";
import { useAuthUI } from "../hooks/useAuthUI";
import { useTask } from "../Context/TaskContext";
import AuthError from "../components/AuthError";
import Loader from "../components/Loader";
import styles from "../styles/AuthPage.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AuthPage = () => {
  const {
    isLogin,
    formData,
    errorMessage,
    handleChange,
    handleSubmit,
    toggleAuthMode,
  } = useAuthForm();
  const { getAuthTitle, getPasswordPlaceholder, getButtonText, getToggleText } =
    useAuthUI();
  const {
    state: { status, isAuthenticated, activePage },
  } = useTask();
  const navigate = useNavigate();
  const toggleText = getToggleText(isLogin);

  useEffect(() => {
    if (isAuthenticated) navigate(`/app/${activePage}`);
  }, [isAuthenticated, activePage, navigate]);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.authTitle}>Workflow</h1>
        <p className={styles.authSubtitle}>{getAuthTitle(isLogin)}</p>

        {errorMessage && <AuthError />}
        {status === "loading" && <Loader variant="dots" />}
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              className={styles.input}
              required
              placeholder="you@example.com"
              onChange={handleChange}
              value={formData.email}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              className={styles.input}
              required
              placeholder={getPasswordPlaceholder(isLogin)}
              onChange={handleChange}
              value={formData.password}
              minLength="5"
            />
          </div>

          <button type="submit" className={styles.button}>
            {getButtonText(isLogin)}
          </button>
        </form>

        <div className={styles.toggleText}>
          <p>
            {toggleText.prompt}
            <span onClick={toggleAuthMode} className={styles.toggleLink}>
              {toggleText.link}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
