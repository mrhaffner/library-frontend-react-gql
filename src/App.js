import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import { useQuery, useApolloClient, useLazyQuery, useSubscription } from '@apollo/client';
import { ALL_AUTHORS, ALL_BOOKS, GET_BOOKS_BY_GENRE, GET_GENRE, BOOK_ADDED } from './queries'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [getBooks, results] = useLazyQuery(GET_BOOKS_BY_GENRE)

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  useEffect(() => {
    const existingToken = localStorage.getItem('books-user-token')
    if (existingToken) {
      setToken(existingToken)
    }
  }, [])

  const authorResult = useQuery(ALL_AUTHORS)
  const bookResult = useQuery(ALL_BOOKS)
  const genreResult = useQuery(GET_GENRE)
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

  const handleRecommendClick = () => {
    getBooks({variables: {genre: genreResult.data.me.favoriteGenre}})
    setPage('recommend')
  }

  if (authorResult.loading || bookResult.loading || genreResult.loading)  {
    return <div>loading...</div>
  }

  return (
    <div>

      <Notify errorMessage={errorMessage} />

      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => handleRecommendClick()}>recommend</button>}
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
        updateCacheWith={updateCacheWith}
      />

      {genreResult.data.me &&
        <Recommendations 
          show={page === 'recommend'}
          booksResult={results}
          genre={genreResult.data.me.favoriteGenre}
        />
      }

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