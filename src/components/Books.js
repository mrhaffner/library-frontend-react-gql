import React, { useState } from 'react'

const Books = ({ show, books }) => {
  const [filter, setFilter] = useState(null)
  
  if (!show) {
    return null
  }

  const genres = [...new Set(books.map(book => book.genres).flat())]
  const filteredBooks = filter ? books.filter(book => book.genres.includes(filter)) : books

  return (
    <div>
      <h2>books</h2>
      {filter &&
        <p>in genre <strong>{filter}</strong></p>
      }

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
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      
      {genres.map(genre => 
        <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>
      )}
      <button onClick={() => setFilter(null)}>all genres</button>

    </div>
  )
}

export default Books