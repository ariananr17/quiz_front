import { Link } from 'react-router-dom'
import QuizCard from '../QuizCard/QuizCard'
import styles from './QuizList.module.css'
import { fetchQuizzesByCategory } from '../../services/apiService.js'

function QuizList({ quizList, categories, setQuizList }) {

  console.log(categories)

  const getQuizzesByCategory = async (categoryId) => {
    return await fetchQuizzesByCategory(categoryId)
  }

  const handleCategoryClick = async (categoryId) => {
    const data = await getQuizzesByCategory(categoryId)
    setQuizList(data)
  }


  return (
    <>
    <header className={styles.headerStyles}>
      <Link to="/categories" className={styles.linkStyle} >Categories</Link>
      <Link to="/create" className={styles.linkStyle} >Create</Link>
    </header>
    
    <div className={styles.quizListContainer}>
        {
            quizList.map((quiz) => (
            <div  key={quiz.id} className={styles.quizCardContainer}>
                <QuizCard id={quiz.id} title={quiz.title} category={quiz.category.name} />
                
            </div>
        ))
        }
    </div>
    </>
    
  )
}

export default QuizList