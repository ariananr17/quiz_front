import { useEffect, useState } from 'react'
import './global.css'
import { Routes, Route, BrowserRouter} from 'react-router-dom'
import QuizList from './components/QuizList/QuizList'
import CreateQuiz from './components/CreateQuiz/CreateQuiz'
import { fetchAllCategories, fetchAllQuizzes } from '../src/services/apiService.js'
import Quiz from './components/Quiz/Quiz.js'
import Categories from './components/Categories/Categories.js'
import CategoryQuiz from './components/CategoryQuiz/CategoryQuiz.js'



function App() {
  const [quizList, setQuizList] = useState([])
  const [categories, setCategories] = useState([])
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true)
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    setLoading(true)
    const [quizResponse, categoriesResponse] = await Promise.all([
        fetchAllQuizzes(page),
        fetchAllCategories()
      ])

      setQuizList((prev) => [...prev, ...quizResponse])
      setCategories(categoriesResponse)

      setLoading(false)

      if (quizResponse.length < 12) {
      setHasMore(false); // Si no hay 20 elementos, significa que ya no hay más
    }
  }

  const handleScroll = (event) => {
    const bottom = event.target.scrollHeight === event.target.scrollTop + event.target.clientHeight;
    console.log('not bottom')
    if (bottom && hasMore) {
      console.log('bottom')
      setPage((prevPage) => prevPage + 1); // Cargar la siguiente página
    }
  }

  useEffect(() => {
    if (quizList.length === 0) {
    setLoading(true); // asegurar que arranca en true
    fetchData();
  }
  },[page])

  useEffect(() => {
    console.log(categories)
  },[categories])

  return (
    
      <div onScroll={handleScroll} style={{ height: '100vh', overflowY: 'auto' }}>
      <Routes>
          <Route path="/" element={<QuizList loading={loading} quizList={quizList} setQuizList={setQuizList} categories={categories} />} />
          <Route path="/categories/:id" element={<CategoryQuiz />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/create" element={<CreateQuiz />} />
          <Route path="/quiz/:id" element={<Quiz />} />
      </Routes>
      </div>
    
      
    
  )
    
}

export default App
