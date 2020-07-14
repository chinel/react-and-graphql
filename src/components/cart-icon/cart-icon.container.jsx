import React from 'react';
import {Mutation} from 'react-apollo';
import {gql} from 'apollo-boost';

import CartIcon from "./cart-icon.component";


const TOGGLE_CART_HIDDEN = gql`
 mutation ToggleCartHidden{
   toggleCartHidden @client
 }
`;


const CartIconContainer =  () => (
    <Mutation mutation={TOGGLE_CART_HIDDEN}>
        {
            //This value toggleCartHidden is what we get from the function we do not really
            //need to pull it off this function as we have been doing previously
            //we can just write it as it is and probably call it any name, it must not be toggleCartHidden =>
            toggleCartHidden => <CartIcon toggleCartHidden={toggleCartHidden}/>
        }
    </Mutation>
);

export default CartIconContainer;
