const url = import.meta.env.VITE_API_URL


export async function createNewQuiz(newQuiz) {
    console.log(newQuiz)
    const res = await fetch(`${url}/quiz`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: newQuiz.title,
            category: newQuiz.category,
            questions: newQuiz.questions
        })
    })
    const data = await res.json()
}

export async function fetchAllQuizzes(page) {
    const res = await fetch(`${url}/quiz?page=${page}&size=15`)
    const data = await res.json()
    console.log(data)
    return data
}

export async function fetchAllCategories() {
    const res = await fetch(`${url}/categories`)
    const data = await res.json()
    return data
}

export async function fetchQuizzesByCategory(categoryId) {
    const res = await fetch(`${url}/quiz/quizzes?categoryId=${categoryId}`)
    const data = await res.json()
    return data
    
}

export async function fetchQuizById(id) {
    const res = await fetch(`${url}/quiz/${id}`)
    const data = await res.json()
    return data
}

export async function deleteQuizById(id) {
    await fetch(`${url}/quiz?quizId=${id}`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json"
        }
    })
}