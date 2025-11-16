import { Link, useNavigate } from "react-router-dom";
import { navItems } from "../data/navItems";
import { useTask } from "../Context/TaskContext";
import { useState } from "react";
import styles from "../styles/Sidebar.module.css";

const Sidebar = () => {
  const {
    state: { activePage },
    dispatch,
  } = useTask();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  function handleLogout() {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  }

  function handleNavClick(path) {
    dispatch({ type: "SET_ACTIVE", payload: path });
    setIsMobileOpen(false);
  }

  function handleMobileToggle() {
    setIsMobileOpen(!isMobileOpen);
  }

  return (
    <>
      <div
        className={`${styles.sidebarOverlay} ${
          isMobileOpen ? styles.mobileOpen : ""
        }`}
        onClick={() => setIsMobileOpen(false)}
      />
      <div
        className={`${styles.sidebar} ${isMobileOpen ? styles.mobileOpen : ""}`}
      >
        <div className={styles.mobileHeader}>
          <div className={styles.logo}>⚡ Workflow</div>
          <button className={styles.mobileToggle} onClick={handleMobileToggle}>
            ✕
          </button>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.navItem} ${
                activePage === item.path ? styles.navItemActive : ""
              }`}
              onClick={() => handleNavClick(item.path)}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <button onClick={handleLogout} className={styles.logoutButton}>
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>
      <div className={styles.mobileBottomNav}>
        <div className={styles.mobileNavItems}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.mobileNavItem} ${
                activePage === item.path ? styles.mobileNavItemActive : ""
              }`}
              onClick={() =>
                dispatch({ type: "SET_ACTIVE", payload: item.path })
              }
            >
              <span className={styles.mobileNavIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
          <button className={styles.mobileNavItem} onClick={handleLogout}>
            <span className={styles.mobileNavIcon}>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
