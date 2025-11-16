import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import styles from "../styles/AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Main />
    </div>
  );
}

export default AppLayout;
