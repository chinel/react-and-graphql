import React from 'react';
import {Mutation, Query, /*compose,*/ graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash'
import {gql} from 'apollo-boost';

import CartIcon from "./cart-icon.component";


const TOGGLE_CART_HIDDEN = gql`
 mutation ToggleCartHidden{
   toggleCartHidden @client
 }
`;

const GET_CART_ITEM_COUNT = gql`
   {
    itemCount @client
   }
`;

//instead of passing in just the props, because if you console.log the props you will find out it returns
// a whole lot of data we might not be using so all we want to do is just pluck off the values we want from the props
//
const CartIconContainer =  (/*props*/ {data: {itemCount}, toggleCartHidden}) => {
    //console.log(props);
return (
 <CartIcon toggleCartHidden={toggleCartHidden} itemCount={itemCount}/>
)
}

//here just like we did with connect function of redux
// we will pass the CartIconContainer Component as an argument to the return of the compose function
//This compose function with the help of graphql function will group all our mutation and query that we are
//trying to add to the CartIcon Component
//the graphql acts more of like a higher order component that takes the mutation and queries we have written and
//binds them then passes it down to the compose function
//when we use graphql and pass our query we now have access to the data object which the CartIconContainer
//receives as props
//If we pass in the mutation to the graphql function it will give us the mutation as a prop, the only difference is by default
//the name of mutation that is being return is not the same name as the mutation we are plucking from the gql string
//which is toggleCartHidden, instead it is going to call it mutate, we would it to be called mutate rather we would want it to
//be called the same name as it is in the mutation query toggleCartHidden which kind of describes what it is meant to do
//In other for us to change the name we would pass in a configuration object as a second parameter to the graphql function
//this configuration object takes a number of configuration options, but the only one we are concerned about now is the name option
// we can also do the same thing to the graphql function that we passed the gql query to, so instead of getting back a data object
// we can decide to call it ItemCountData or anything, this would be very useful when we will be having multiple queries and we want to
// differentiate which is which
//once we do this we now have access to the props like this const CartIconContainer =  (props) => (
//this pattern is way more similar to react redux connect, but the apollo team seems to be pushing way harder for the
//Mutation and Query Component style, this pattern of using compose and graphql is still okay, it makes use of higher order component pattern
//which is a pattern that has been in the react ecosystem for long
//The Mutation and Query component pattern is the similar to context api
//NOW IF YOU WOULD JUST BE NESTING JUST ONE MUTATION AND QUERY OR JUST TWO THEN THE COMPONENT PATTERN IS OKAY
//BUT IF YOU WILL BE NESTING SO MANY QUERIES AND MUTATIONS THEN THE COMPOSE AND GRAPHQL HIGHER ORDER COMPONENT PATTERN IS WAY BETTER
//Another thing to keep note of is that the CartIconContainer is works as a container layer that works on getting the data and deciding on how to pass the data down to the cart icon component
//While the CartIcon Container just serves as the presentational layer

//PLEASE NOTE : compose has been removed from react apollo 3, so to use compose you have to install lodash as use flowRight like this
//import {flowRight as compose} from 'lodash';

//Setting up and using Apollo Client is really a complex thing to do and business wise in terms of cost not all companies might be willing to
// take that risk as your entire frontend and backend team needs to know how to use it, as you have to set it up in the backend which is also a whole lot of work
// more than setting it up in the frontend

//the Apollo team is trying to move away from the higher order component style to using the stacking of component style
//Some companies still use react redux as their bread and butter for state management, even though one of its disadvantages is its complexity
//It does have some many advantages there is an amazing community when it comes to redux, also as your application scales the redux architecture does scale really well
//They way you architect your application, deciding on the folder structure and what files should go into what folder
// when using react redux, it has been tried and tested and it works really well with large applications
export default compose(
    graphql(GET_CART_ITEM_COUNT),
    graphql(TOGGLE_CART_HIDDEN, {name: 'toggleCartHidden'})
)(CartIconContainer);
