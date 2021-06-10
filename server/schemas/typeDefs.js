const { gql } = require('apollo-server-express');

const typeDefs = gql `
    type Category {
        _id: ID
        name: String
        description: String
        image: String
    }
    type Product {
        _id: ID
        name: String
        description: String
        image: String
        quantity: Int
        price: Float
        category: Category
        userId: String
    }
    type User {
        _id: ID
        firstName: String
        lastName: String
        email: String
        products: [Product]
    }
    type Auth {
        token: ID!
        user: User
    }
    input NewProduct {
        _id: ID
        name: String
        description: String
        image: String
        quantity: Int
        price: Float
        category: String
        userId: String
    }
    type Query {
        categories: [Category]
        products(category: ID, name: String): [Product]
        product(_id: ID!): Product
        user: User
        getUserById(_id:ID): User
        orders(_id: ID!): Order
    }
    type Mutation {
        addUser(firstName: String!, lastName: String!, email: String!, password: String!, location: String!, seeds: Float!): Auth
        addProduct(name: String!, description: String!, price: Float!, quantity: Int!, category: String!, userId: String!): User
        getUserName(_id: ID, firstName: String!): User
        updateUser(firstName: String, lastName: String, email: String, password: String): User
        updateProduct(_id: ID!, quantity: Int!): Product
        login(email: String!, password: String!): Auth
        createProduct(productInfo: NewProduct!): User
        deleteProduct(productId: ID!): User
    }
`;

module.exports = typeDefs; 