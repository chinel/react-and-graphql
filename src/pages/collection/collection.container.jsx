import React from 'react';
import  {Query} from 'react-apollo';
import {gql} from 'apollo-boost';
import CollectionPage from "./collection.component";
import Spinner from "../../components/spinner/spinner.component";


//The reason this structure looks like as if we wrote the getCollectionByTitle twice is because the title we are expecting
//is going to be a dynamic value
const GET_COLLECTION_BY_TITLE = gql`
query getCollectionsByTitle($title: String!){
 getCollectionsByTitle(title: $title){
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

const CollectionPageContainer = ({match}) => (
    <Query query={GET_COLLECTION_BY_TITLE} variables={{title: match.params.collectionId}}>
        {
            ({loading, data}) => {
                console.log({data})
                if(loading) return <Spinner/>;
                return <CollectionPage collection={data.getCollectionsByTitle}/>
            }
        }
    </Query>
);

export  default  CollectionPageContainer;
