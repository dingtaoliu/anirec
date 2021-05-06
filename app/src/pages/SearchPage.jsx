import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import {ItemList} from '../components/ItemList';
import ItemPage from './ItemPage'

import { Route, Link, Switch, useHistory, useParams } from "react-router-dom";

const SearchPage = () => {
    let { query } = useParams();
    const [searchedItems, setSearchedItems] = useState([]);
    const history = useHistory()

    const dummyItems = [
        {title: "digimon", desc: "this is a show about monsters"}, 
        {title: "attack on titan", desc: "a show about giants"}, 
        {title: "pokemon", desc: "a show about poket monsters"}, 
        {title: "naruto", desc: "a show about fire shadows"}, 
        {title: "gurren lagann", desc: "the best show ever"}, 
        {title: "new gundam", desc: "looking forward to this"},
    ]

    const makeQuery = (query) => {
        const queryParams = new URLSearchParams();
        if (query) {
            queryParams.append("query", query)
        } else {
            queryParams.delete("query")
        }
        console.log(queryParams.toString());
        fetch("/search?" + queryParams.toString())
            .then(res => res.json())
            .then(
                (result) => {
                    const items = result.map((record) => {
                        return {
                            id: record.ID,
                            title: record.title,
                            desc: record.description
                        }
                    })
                    setSearchedItems(items);
                },
                () => {
                    setSearchedItems([]);
                }
            );
        // setSearchedItems(filtered);

        history.push({
            pathname: '/search',
            search: queryParams.toString()
        });
    }

	
    return (
        <>
            <SearchBar 
                makeQuery={makeQuery}
            />

            <Switch>
                {/* {searchedItems.map((item) => 
                    <Route key={item.id} path={"/:id"}> 
                        <ItemPage id={id}/>
                    </Route>
                )} */}
                <Route path="/search">
                    <ItemList itemList={searchedItems}/>
                </Route>
                <Route path={"/item/:id"}> 
                    <ItemPage />
                </Route>
            </Switch>
        </>
    );
}

export default SearchPage