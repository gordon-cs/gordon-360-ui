import styles from './ScottieDog.module.css';

const ScottieDog = () => {
  return (
    <div className={styles.dog}>
      <div className={styles.dog_body}></div>
      <div className={styles.dog_head}>
        <div className={styles.dog_eye}></div>
        <div className={styles.dog_nose}></div>
        <div className={styles.dog_ear}></div>
        <div className={styles.dog_collar}>GORDON 360</div>
      </div>
      <div className={`${styles.dog_leg} ${styles.dog_leg1}`}></div>
      <div className={`${styles.dog_leg} ${styles.dog_leg2}`}></div>
      <div className={`${styles.dog_leg} ${styles.dog_leg3}`}></div>
      <div className={`${styles.dog_leg} ${styles.dog_leg4}`}></div>
      <div className={styles.dog_tail}></div>
    </div>
  );
};

export default ScottieDog;
