import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import {ItemList} from '../components/ItemList';
import ItemPage from './ItemPage'

import { Route, Link, Switch, useHistory } from "react-router-dom";

const SearchPage = () => {
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

        fetch('/items')
            .then(res => res.json())
            .then(
                (result) => {
                    const items = result.map((record) => {
                        return {
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

        const queryParams = new URLSearchParams();
        if (query) {
            queryParams.append("query", query)
        } else {
            queryParams.delete("query")
        }
        history.push({
            pathname: '/search',
            search: queryParams.toString()
        });
    }

    // useEffect(() => {fetchData()}, []);
	
    return (
        <>
            <SearchBar 
                makeQuery={makeQuery}
            />

            <Switch>
                {searchedItems.map((item) => 
                    <Route path={"/".concat(item.title)}> 
                        <ItemPage data={item}/>
                    </Route>
                )}
                <Route path="/search">
                    <ItemList itemList={searchedItems}/>
                </Route>
            </Switch>
        </>
    );
}

export default SearchPage