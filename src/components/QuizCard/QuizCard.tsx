import { Link } from 'react-router-dom'
import styles from './QuizCard.module.css'

function QuizCard({ title, category, id }) {
  return (
        <>
          <p>{title}</p>
          <p className={styles.category} style={{ alignSelf: 'end '}}>{category}</p>
          <Link  className={styles.goToBtn} to={`/quiz/${id}`}>Go to Quiz</Link>
        </>
  )
}

export default QuizCard