import { gql  } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
        name
    }
    genres
    id
  }
`

export const ALL_AUTHORS = gql`
query {
    allAuthors {
        name
        born
        bookCount
    }
}
`

export const ALL_BOOKS = gql`
query {
    allBooks {
        title
        published
        author {
            name
        }
        genres
        id
    }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $name: String!, $genres: [String!]!) {
    addBook(
        title: $title,
        published: $published,
        name: $name,
        genres: $genres
    ) {
        title
        published
        author {
            name
        }
        genres
        id
    }
}
`

export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
        name
        born
        id
    }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const GET_GENRE = gql`
  query {
      me {
        favoriteGenre
      }
  }
`

export const GET_BOOKS_BY_GENRE = gql`
  query allBooks($genre: String) {
      allBooks(genre: $genre) {
        title
        published
        author {
            name
        }
        genres
      }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`