import { Outlet } from "react-router-dom";
import styles from "../styles/Main.module.css";

function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
