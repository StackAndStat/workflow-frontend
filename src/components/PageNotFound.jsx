import { Link } from "react-router-dom";
import styles from "../styles/PageNotFound.module.css";

function PageNotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.errorCode}>404</div>
      <div className={styles.errorIcon}>🔍</div>
      <h1 className={styles.title}>Page Not Found</h1>
      <p className={styles.subtitle}>
        Sorry, the page you're looking for doesn't exist. It might have been
        moved, deleted, or you entered the wrong URL.
      </p>
      <Link to="/app/dashboard" className={styles.homeButton}>
        Go to Dashboard
      </Link>
    </div>
  );
}

export default PageNotFound;
