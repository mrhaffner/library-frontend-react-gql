import React, { useState, useEffect } from 'react'

const Recommendations = ({ show, genre, booksResult }) => {
  const [books, setBooks] = useState(null)

  useEffect(() => {
    if (booksResult.data) {
      setBooks(booksResult.data.allBooks)
    }
  }, [booksResult])

  if (!show) {
    return null
  }

  if (!books) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>recommendations</h2>

        <p>books in your favorite genre <strong>{genre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Recommendations