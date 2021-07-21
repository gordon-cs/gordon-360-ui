import styles from './ScottieDog.module.css';

const ScottieDog = () => {
  return (
    <div className={styles.dog}>
      <div className={styles.dog-body}></div>
      <div className={styles.dog-head}>
        <div className={styles.dog-eye}></div>
        <div className={styles.dog-nose}></div>
        <div className={styles.dog-ear}></div>
        <div className={styles.dog-collar}>GORDON 360</div>
      </div>
      <div className={`${styles.dog-leg} ${styles.dog-leg1}`}></div>
      <div className={`${styles.dog-leg} ${styles.dog-leg2}`}></div>
      <div className={`${styles.dog-leg} ${styles.dog-leg3}`}></div>
      <div className={`${styles.dog-leg} ${styles.dog-leg4}`}></div>
      <div className={styles.dog-tail}></div>
    </div>
  );
};

export default ScottieDog;
