
const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category, Order, Purchases, Sales } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find(); 
        },
        products: async (parent, { category, name }) => {
            const params = {};
            
            if (category) {
                params.category = category; 
            }
            if (name) {
                params.name = { $regex: name };
            }
            return await Product.find(params).populate('category');
        },
        product: async (parent, {_id}) => {
            return await Product.findById(_id).populate('category');
        },
        user: async (parent, args, context) => {
            if (context.user) {
              const user = await User.findById(context.user._id)
              .populate({
                path: 'products',
                populate: 'category'
              })

              user.products.sort((a, b) => b.addDate - a.addDate);
        
              return user;
            }
        
            throw new AuthenticationError('Not logged in');
        },
        getUserById: async (parent, args, context) => {
      
            const user = await User.findById(args._id)
            .populate({
              path: 'products',
              populate: 'category'
            });
      
            user.products.sort((a, b) => b.addDate - a.addDate);
    
          if (user) {
            return user;
          }
      
          throw new AuthenticationError('Not available');
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
        
            return { token, user };
        },
        addProduct: async (parent,  data , context) => {
            if(context.user) {
              const category = await Category.findOne({name:data.category});
              const product = await Product.create({name:data.name, description:data.description, price:data.price, quantity:data.quantity, category:category._id, userId: context.user._id });
              const user = await User.findByIdAndUpdate(context.user._id, { $push: { products: product } }, {new: true});
      
              return user; 
            }
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
              return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
        
            throw new AuthenticationError('Not logged in');
        },
        updateProduct: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;
        
            return await Product.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },
        createProduct: async(parent, { productInfo }, context) => {
            if (context.user) {
              const updateUser = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { products : productInfo } },
                { new: true }
              );
              return updateUser;
            }
            throw new AuthenticationError('You must be logged in to add a new product to your shop')
        },
        deleteProduct: async (parent, { productId }, context) => {
            if (context.user) {
              const increment = Math.random().toPrecision(2) *-1;
      
              console.log ("increment",increment);
              console.log ("productId",productId);
              
              const updateProduct = await Product.findByIdAndDelete(
                { _id: productId }
              );
      
              const updateUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { products: { _id: productId }} ,$inc: { seeds: increment }},
                { new: true }
              );
      
              console.log("updateUser",updateUser);
              return updateUser;
            }
            throw new AuthenticationError('You must be logged in to remove a product from your shop')
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
        
            if (!user) {
              throw new AuthenticationError('Incorrect email');
            }
        
            const correctPw = await user.isCorrectPassword(password);
        
            if (!correctPw) {
              throw new AuthenticationError('Incorrect password');
            }
        
            const token = signToken(user);
        
            return { token, user };
        }
    }
};

module.exports = resolvers; 