import React from  'react';

import {Query} from 'react-apollo';
import {gql} from 'apollo-boost';
import CollectionsOverview from "./collections-overview.component";
import Spinner from "../spinner/spinner.component";


// We are using all caps for the variable name as this variable will never change, so it needs to be represented as a constant. The back tick is for string interpolation
const GET_COLLECTIONS = gql`
{
collections{
id
title
items{
id
name
price
imageUrl
}
}
}
`;

//This stateless functional component returns the Query component which gives us back a function, with an object that gets passed a whole
//lot of properties, but the main properties we will be more concerned about is the loading, error and data which we will destructure off the object
const CollectionsOverviewContainer = () => (
    <Query query={GET_COLLECTIONS}>
        {
            ({loading, error, data}) => {
              console.log({loading});
              console.log({error});
              console.log({data});
              if(loading) return <Spinner/>
              return <CollectionsOverview collections={data.collections}/>
            }
        }
    </Query>
)

export default CollectionsOverviewContainer;
