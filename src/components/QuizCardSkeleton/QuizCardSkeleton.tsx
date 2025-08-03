import styles from './QuizCardSkeleton.module.css';

export default function QuizCardSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.titlePlaceholder}></div>
      <div className={styles.categoryPlaceholder}></div>
      <div className={styles.buttonPlaceholder}></div>
    </div>
  );
}