import gql from 'graphql-tag';


export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_PRODUCT = gql`
mutation addProduct($name: String!, $description: String!, $price: Float!, $quantity: Int!, $category: String!, $userId: String!) {    
  addProduct(name: $name, description: $description, price: $price, quantity: $quantity, category: $category, userId: $userId) {
    _id
    firstName
    lastName
    products{
      _id
      name
      description
      price
      quantity
      image
      category{
        _id
        name
      }
      userId
    }
}
}
`

export const DELETE_PRODUCT = gql `
  mutation deleteProduct($productId: ID!) {
    deleteProduct(productId: $productId){
      _id
    firstName
    lastName
    seeds
    products{
      _id
      name
      description
      price
      quantity
      image
      category{
        _id
        name
      }
      userId
    }
    }
  }
`

export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    updateUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      _id
      firstName
      lastName
      email
      products{
        _id
        name
        description
        price
        quantity
        image
        category{
          _id
          name
        }
        userId
      }
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation updateProduct($_id: ID!, $quantity: Int!) {
    updateProduct(_id: $_id, quantity: $quantity) {
      _id
      name
      description
      image
      quantity
      price
      category {
        _id
        name
      }
      userId
    }
  }
`
