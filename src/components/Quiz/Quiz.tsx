import { useEffect, useRef, useState } from "react"
import styles from './Quiz.module.css'
import { useParams } from "react-router-dom"
import { fetchQuizById } from '../../services/apiService.js'
import { Modal } from "../Modal/Modal.js"

function Quiz() {
  const { id } = useParams()
  const [quiz, setQuiz] = useState({})
  const [question, setQuestion] = useState({})
  const [selectedId, setSelectedId] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [score, setScore] = useState(0)
  const currentQuestionIndex = useRef(0)
  const maxIndex = useRef(false)

  let templateString = `${maxIndex.current ? 'Finish' : 'Next Question'}`

  const getQuiz = async (id) => {
    const response = await fetchQuizById(id)
    setQuiz(response)
    setQuestion(response.questions[currentQuestionIndex.current])
  }

  useEffect(() => {
    getQuiz(id)
  }, [])

  const handleAnswerClick = (id) => {
    if(selectedId) {
      return
    }
    setSelectedId(id)
    const selected = question.answers.filter(a => a.id === id)
    if(selected[0].isCorrect) {
      setScore(prev => prev + 1)
    }
  }

  const applyAnswerStyles = (isCorrect) => {
    if(isCorrect) {
      return styles.correct
    } else {
      return styles.incorrect
    }
  }

  const handleNextQuestionClick = () => {
    setSelectedId(false)
    setQuestion(quiz.questions[currentQuestionIndex.current = currentQuestionIndex.current + 1 ])
  }


  useEffect(() => {
    if(currentQuestionIndex.current >= quiz?.questions?.length) {
      maxIndex.current = true
      setIsFinished(true)
    }
  }, [question])

  const renderView = () => {
    if(isFinished) {
      return <div className={styles.quizContainer} >
        <div className={styles.quiz} >
          <h1 style={{ marginBottom: '10px'}} >Quiz Finished</h1>
          <p>Score: {score}/{quiz.questions.length}</p>
        </div>
      </div>
    }  else {
      return (
    
    <>
    <div className={styles.quizContainer} >

      <div className={styles.quiz} >
        <h1 style={{ textAlign: 'center', fontSize: '35px'}} >{quiz.title}</h1>
        <div style={{ fontSize: '27px', marginBottom: '10px'}} >{question?.question}</div>
        <div>
         {question?.answers?.map(a => (
            <div key={a.id} className={`${styles.answers} ${a.id === selectedId ? applyAnswerStyles(a.isCorrect) : ''}`} onClick={() => handleAnswerClick(a.id)} >{a.answer}</div>
          ))}
        </div>
        <button className={styles.nextButton} onClick={handleNextQuestionClick}>{templateString}</button>
        
      </div>
      <button onClick={() => setIsOpen(true)} className={styles.deleteBtn}>Delete Quiz</button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} >
          Are you sure you want to delete this quiz?
      </Modal>
      
    </div>
    
    </>
    
      
    
  )
    }
  }

  return (
    <>
    {renderView()}
    </>
  )
  
}

export default Quiz

