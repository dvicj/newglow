import gql from 'graphql-tag';

export const QUERY_CATEGORIES = gql`
{
  categories {
    _id
    name
    image
    description
  }
}
`;

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
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

export const QUERY_USER = gql`
{
  user {
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
      sellerId
    }
  }
}
`;

export const QUERY_USER_BY_ID = gql`
{
  query getUserById (_id: ID){
    getUserById(_id: $_id) {
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
}
`;
