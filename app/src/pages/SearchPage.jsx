import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';
import ItemPage from './ItemPage'

import { Route, Switch } from "react-router-dom";

const SearchPage = () => {
    return (
        <>
            <SearchBar />

            <Switch>
                <Route path={"/search"} component={SearchResults} />
                <Route exact path={"/item/:id"} component={ItemPage} />
            </Switch>
        </>
    );
}

export default SearchPage