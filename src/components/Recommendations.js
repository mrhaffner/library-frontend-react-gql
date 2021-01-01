import React from 'react'
import { GET_GENRE } from '../queries'
import { useQuery } from '@apollo/client';

const Recommendations = ({ show, books }) => {

  const genreResult = useQuery(GET_GENRE)

  if (!show) {
    return null
  }

  if (genreResult.loading) {
    return <div>loading...</div>
  }

  const genre = genreResult.data.me.favoriteGenre

  const filteredBooks = books.filter(book => book.genres.includes(genre))

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
          {filteredBooks.map(a =>
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