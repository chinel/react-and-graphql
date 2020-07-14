import {gql} from 'apollo-boost';

export const typeDefs = gql`
 extend type Mutation{
   ToggleCartHidden: Boolean!
 }
`;


const GET_CART_HIDDEN = gql`
{
  cartHidden @client
}`;


export const resolvers = {
  Mutation:{
      //cache was destructured off the _context parameter
      toggleCartHidden: (_root, _args /*{_context: {cache}}*/,{cache}, _info) => {
          // this comes back to us as a data object just as it is defined in the index.js file and we need to destructure the cartHidden off the data Object
          const /*{data: {cartHidden}}*/ {cartHidden} = cache.readQuery({
              query: GET_CART_HIDDEN/*,
              variables: {} If we want to pass in variables we can do that using the variables properties*/
          });

          cache.writeQuery({
              query: GET_CART_HIDDEN,
              data: {cartHidden: !cartHidden}
          });
          return !cartHidden;
      }
  }
};