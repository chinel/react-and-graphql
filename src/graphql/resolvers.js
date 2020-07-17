import {gql} from 'apollo-boost';
import {addItemToCart, getCartItemCount} from '../redux/cart/cart.utils';

//The extend type Item is extending the Item we have
//on our backend graphql server and it is adding a quantity prop which might or may not be available
//the add item to cart function was added to the Mutation, which will receive an item and return an array of items which
//might or may not be present
//But the array must come back
export const typeDefs = gql`
 extend type Item{
    quantity: Int
 }
 
 
 extend type Mutation{
   ToggleCartHidden: Boolean!
   AddItemToCart(item: Item!): [Item]!
 }
`;


const GET_CART_HIDDEN = gql`
{
  cartHidden @client
}`;

const GET_CART_ITEMS = gql`
{
  cartItems @client
}
`;

const GET_ITEM_COUNT = gql `
{
   itemCount @client
}
`;


export const resolvers = {
  Mutation:{
      //cache was destructured off the _context parameter
      toggleCartHidden: (_root, _args /*{_context: {cache}}*/,{cache}, _info) => {
          // the return of cache.readQuery comes back to us as a data object just as it is defined in the index.js file and we need to destructure the cartHidden off the data Object
          const /*{data: {cartHidden}}*/ {cartHidden} = cache.readQuery({
              query: GET_CART_HIDDEN/*,
              variables: {} If we want to pass in variables we can do that using the variables properties*/
          });

          cache.writeQuery({
              query: GET_CART_HIDDEN,
              data: {cartHidden: !cartHidden}
          });
          return !cartHidden;
      },
      //here we will pass in a variable item and destructure it off _args parameter
      addItemToCart: (_root, {item}, {cache}) => {
          const {cartItems} = cache.readQuery({
              query: GET_CART_ITEMS,

          });
          const newCartItems = addItemToCart(cartItems, item);

          cache.writeQuery({
              query: GET_ITEM_COUNT,
              data: {itemCount: getCartItemCount(newCartItems)}
          })
          cache.writeQuery({
              query: GET_CART_ITEMS,
              data:{cartItems: newCartItems}
          });
          return newCartItems;
           }
  }
};
