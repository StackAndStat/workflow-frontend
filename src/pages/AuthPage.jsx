import { useAuthForm } from "../hooks/useAuthForm";
import { useAuthUI } from "../hooks/useAuthUI";
import AuthError from "../components/AuthError";
import styles from "../styles/AuthPage.module.css";

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

  const toggleText = getToggleText(isLogin);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h1 className={styles.authTitle}>Workflow</h1>
        <p className={styles.authSubtitle}>{getAuthTitle(isLogin)}</p>

        {errorMessage && <AuthError />}

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
