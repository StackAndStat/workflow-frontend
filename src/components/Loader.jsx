import styles from "../styles/Loader.module.css";

function Loader({
  size = "medium",
  variant = "spinner",
  text = "Loading",
  showText = true,
  inline = false,
}) {
  const sizeClass = {
    small: styles.spinnerSmall,
    medium: "",
    large: styles.spinnerLarge,
  }[size];

  const renderLoader = () => {
    switch (variant) {
      case "spinner":
        return <div className={`${styles.spinner} ${sizeClass}`}></div>;

      case "pulse":
        return <div className={styles.pulse}></div>;

      case "dots":
        return (
          <div className={styles.dots}>
            <span></span>
          </div>
        );

      case "skeleton":
        return (
          <div className={styles.skeletonCard}>
            <div
              className={`${styles.skeleton} ${styles.skeletonText} ${styles.skeletonTextShort}`}
            ></div>
            <div
              className={`${styles.skeleton} ${styles.skeletonText} ${styles.skeletonTextMedium}`}
            ></div>
            <div
              className={`${styles.skeleton} ${styles.skeletonText}`}
              style={{ width: "40%" }}
            ></div>
          </div>
        );

      default:
        return <div className={`${styles.spinner} ${sizeClass}`}></div>;
    }
  };

  if (inline) {
    return (
      <div className={styles.inlineLoader}>
        {renderLoader()}
        {showText && <span>{text}</span>}
      </div>
    );
  }

  if (variant === "skeleton") {
    return <div className={styles.loaderContainer}>{renderLoader()}</div>;
  }

  return (
    <div className={styles.loaderContainer}>
      {renderLoader()}
      {showText && <p className={styles.loadingText}>{text}</p>}
    </div>
  );
}

export default Loader;
