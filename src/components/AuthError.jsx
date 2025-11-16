import { useTask } from "../Context/TaskContext";
import styles from "../styles/AuthError.module.css";

function AuthError() {
  const {
    state: { errorMessage },
  } = useTask();

  if (!errorMessage) return null;
  return <div className={styles.error}>{errorMessage}</div>;
}

export default AuthError;
