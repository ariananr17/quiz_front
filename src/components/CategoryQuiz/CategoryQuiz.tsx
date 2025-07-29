import  { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchQuizzesByCategory } from '../../services/apiService.js'
import QuizCard from '../QuizCard/QuizCard.js'
import styles from './CategoryQuiz.module.css'

const CategoryQuiz = () => {
  const { id } = useParams()
  const [quizList, setQuizList] = useState([])
  

  const getQuizzesByCategory = async (categoryId) => {
    const data = await fetchQuizzesByCategory(categoryId);
    setQuizList(data)
  };

  const getData = async () => {
    return await getQuizzesByCategory(id);
  }

    useEffect(() => {
      getData(id);
      console.log(quizList)
    }, []);

    useEffect(() => {
  console.log(quizList);
}, [quizList]);


  return (
    <>
    <header className={styles.headerStyles}>
      <Link to="/" className={styles.linkStyle} >Home</Link>
    </header>
    <div className={styles.quizListContainer}>
        {
            quizList.map(quiz => (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div key={quiz.id} className={styles.quizCardContainer}>
                <QuizCard id={quiz.id} title={quiz.title} category={quiz.category.name} />

              </div>
              </div>
              
                
            ))
        }
    </div>
    </>
    
  )
}

export default CategoryQuiz