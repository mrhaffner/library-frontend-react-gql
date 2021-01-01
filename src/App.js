import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import { useQuery, useApolloClient } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const existingToken = localStorage.getItem('books-user-token')
    if (existingToken) {
      setToken(existingToken)
    }
  }, [])

  const authorResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (authorResult.loading || bookResult.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>

      <Notify errorMessage={errorMessage} />

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token ? 
          <button onClick={() => logout()}>logout</button> :
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        authors={authorResult.data.allAuthors}
        show={page === 'authors'}
        setError={notify}
        token={token}
      />

      <Books
        books={bookResult.data.allBooks}
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <Recommendations 
        show={page === 'recommend'}
        books={bookResult.data.allBooks}
        
      />

      <LoginForm
        setToken={setToken}
        show={page === 'login'}
        notify={notify}
        setError={notify}
        setPage={setPage}
      />

    </div>
  )
}

export default App