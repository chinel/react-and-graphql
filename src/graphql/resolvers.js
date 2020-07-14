import {gql} from 'apollo-boost';

export const typeDefs = gql`
 extend type Mutation{
   ToggleCartHidden: Boolean!
 }
`;


const GET_CART_HIDDEN = gql`
{
  cartHidden @client
}`


export const resolvers = {
  Mutation:{
      toggleCartHidden: (_root, _args, {_context: {cache}}, _info) => {
          // this comes back to us as a data object just as it is defined in the index.js file and we need to
          const {data: {cartHidden}} = cache.readQuery({
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
