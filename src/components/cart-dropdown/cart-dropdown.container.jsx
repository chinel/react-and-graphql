import React from 'react';
import {Mutation, Query} from 'react-apollo';
import {gql} from 'apollo-boost';

import CartDropdown from './cart-dropdown.component';
import {toggleCartHidden} from "../../redux/cart/cart.actions";

const TOGGLE_CART_HIDDEN = gql`
 mutation ToggleCartHidden{
   toggleCartHidden @client
 }
`;

const GET_CART_ITEMS = gql`
{
    cartItems @client

}
`;


//Here we will be needing the cart items query as well as toggleCartHidden mutation,
//So that the CartDropdown Component gets the 2 functionalities
//To use both a mutation and query we have to wrap it around each other, so the one that should
//come first doesn't matter, The Query can come before the Mutation as long as they are wrapped around each other
export const CartDropdownContainer = () => (
  <Mutation mutation={TOGGLE_CART_HIDDEN}>
      {
          toggleCartHidden => (
              <Query query={GET_CART_ITEMS}>
                  {
                      ({data:cartItems}) => {
                        console.log(cartItems);
                        return (

                          <CartDropdown cartItems={cartItems.cartItems} toggleCartHidden={toggleCartHidden}/>
                      );}
                  }
              </Query>
          )
      }
  </Mutation>
);

export default CartDropdownContainer;
