import React, { useEffect, useState } from 'react'
import { fetchAllCategories, fetchQuizzesByCategory } from '../../services/apiService.js'
import styles from './Categories.module.css'
import { Link } from 'react-router-dom'

type Category = {
  id: string
  name: string
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([])

  const getCategories = async () => {
    const data = await fetchAllCategories()
    setCategories(data)
  }  

  useEffect(() => {
    getCategories()
  }, [])  

  const getQuizzesByCategory = async (categoryId) => {
    return await fetchQuizzesByCategory(categoryId);
  };

  const handleCategoryClick = async (categoryId) => {
    const data = await getQuizzesByCategory(categoryId);
    setQuizList(data);
  };



  return (
    <>
    

    <div>
      {categories.map(category =>  (
        <div className={styles.categoryList}>
        <Link className={styles.categoryItem} to={`/categories/${category.id}`}>
        {category.name}
        </Link>
        </div>
      ))}
    </div>
    </>
    
  )
}

export default Categories