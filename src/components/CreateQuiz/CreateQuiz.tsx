import { useEffect, useRef, useState } from 'react'
import styles from './CreateQuiz.module.css'
import CreatableSelect from 'react-select/creatable'
import { createNewQuiz } from '../../services/apiService.js'
import { Link } from 'react-router-dom'

const options = [
    {value:"history", label:"History"}
]

function CreateQuiz() {
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [questionTitle, setQuestionTitle] = useState("")
  const [firstAnswer, setFirstAnswer] = useState("")
  const [secondAnswer, setSecondAnswer] = useState("")
  const [thirdAnswer, setThirdAnswer] = useState("")
  const [correctAnswer, setCorrectAnswer] = useState("")
  const [questions, setQuestions] = useState([])
  // const [answers, setAnswers] = useState([])
  const answersArrayRef = useRef([]);

  const [firstAdded, setFirstAdded] = useState(false);
  const [secondAdded, setSecondAdded] = useState(false);
  const [thirdAdded, setThirdAdded] = useState(false);
  const [correctAdded, setCorrectAdded] = useState(false);

  const customStyles = {
  control: (base, state) => ({
    ...base,
    padding: '5px',
    width: 'auto',
    borderRadius: '5px',
    border: '1px solid black',
    fontSize: '20px',
    boxShadow: state.isFocused ? '0 0 0 1px rgba(0, 0, 0, 0.3)' : 'none',
    '&:hover': {
      borderColor: 'black',
    },
  }),
  input: (base) => ({
    ...base,
    fontSize: '20px',
  }),
  singleValue: (base) => ({
    ...base,
    fontSize: '20px',
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: '20px',
  }),
};

  const shuffleAnswers = (array) => {

    const shuffled = [...array]; 

    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;

  }

  useEffect(() => {
    console.log(category)
  }, [category])
  
  useEffect(() => {
    console.log(questions)
    setQuestionTitle("")
    setFirstAnswer("")
    setSecondAnswer("")
    setThirdAnswer("")
    setCorrectAnswer("")
    setFirstAdded(false)
    setSecondAdded(false)
    setThirdAdded(false)
    setCorrectAdded(false)
  }, [questions])

  const onAddQuestion = () => {
    console.log(firstAnswer)
    const shuffledAnswers = shuffleAnswers(answersArrayRef.current)

    setQuestions(prev => (
      [
        ...prev,
      {
        question: questionTitle,
        answers: shuffledAnswers
      }
      ]
      
    ))
    console.log(questions)
    answersArrayRef.current = []
    
  }

  const onFinish = () => {
    const newQuiz = {
      title: title,
      category: category,
      questions: questions
    }
    addQuiz(newQuiz)
  }

  const addQuiz = async (newQuiz) => {
    await createNewQuiz(newQuiz)
  }


  return (
    <>
    <header className={styles.headerStyles}>
      <Link to="/" className={styles.linkStyle}>Home</Link>
    </header>
    <div className={styles.createQuizContainer}>
        <h1>Create Quiz</h1>

        <div className={styles.createQuizForm}>

          <div className={styles.quizInput}>
            <label for="title">Quiz Title</label>
            <input type='text' id='title' onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className={styles.categoryList}>
            <label>Category</label>
            <CreatableSelect
              className={styles.select}
              styles={customStyles}
              options={options}
              onChange={(option) => {
                setCategory(option.value)

              } } />
          </div>


          <div className={`${styles.quizInput} ${styles.correctAnswer}`}>
            <label for="question">
              Question

            </label>
            <input
              value={questionTitle}
              type='text'
              id='question'
              placeholder='Type your question...'
              onChange={(e) => {
                setQuestionTitle(e.target.value)
                console.log(questionTitle)
              } } />

          </div>
          <div className={styles.quizOptionsContainer}>
            <input
              placeholder='Answer 1'
              value={firstAnswer}
              onChange={(e) => {
                setFirstAnswer(e.target.value)
              } }
              disabled={firstAdded} />
            <button disabled={firstAdded} className={styles.addAnswerBtn} onClick={() => {
              answersArrayRef.current.push({ answer: firstAnswer, isCorrect: false })
              setFirstAdded(true)
            } }>Add</button>

            <input
              placeholder='Answer 2'
              value={secondAnswer}
              onChange={(e) => {
                setSecondAnswer(e.target.value)
              } }
              disabled={secondAdded} />
            <button disabled={secondAdded} className={styles.addAnswerBtn} onClick={() => {
              answersArrayRef.current.push({ answer: secondAnswer, isCorrect: false })
              setSecondAdded(true)
            } }

            >Add
            </button>

            <input placeholder='Answer 3' value={thirdAnswer} onChange={(e) => setThirdAnswer(e.target.value)} disabled={thirdAdded} />
            <button disabled={thirdAdded} className={styles.addAnswerBtn} onClick={() => {
              answersArrayRef.current.push({ answer: thirdAnswer, isCorrect: false })
              setThirdAdded(true)
            } }>Add</button>
          </div>
          <div className={`${styles.quizInput} ${styles.correctAnswer}`}>
            <label for="question">
              Correct Answer
            </label>
            <input
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              disabled={correctAdded}
              type='text'
              id='question'
              placeholder='Type your answer...' />
            <button disabled={correctAdded} className={styles.addAnswerBtn} onClick={() => {
              answersArrayRef.current.push({ answer: correctAnswer, isCorrect: true })
              setCorrectAdded(true)
            } }

            >Add</button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className={styles.createQuizBtn} onClick={onAddQuestion}>Add Question</button>
            <button className={styles.createQuizBtn} onClick={onFinish}>Create Quiz</button>
          </div>
        </div>

      </div></>
  )
}

export default CreateQuiz