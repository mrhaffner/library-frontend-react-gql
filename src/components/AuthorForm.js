import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from 'react-select';

const AuthorForm = ({ authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ changeAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = e => {
    e.preventDefault()

    changeAuthor({ variables: { name: name.value, setBornTo: born } })

    setName('')
    setBorn('')
  }

  const options = authors.map(a => {
    return { value: a.name, label: a.name}
  })

  return (
    <div>
      <h2>change author's birth year</h2>

      <form onSubmit={submit}>
        <div>
          <Select
            defaultValue={name}
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          born <input
            value={born}
            type='number'
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default AuthorForm