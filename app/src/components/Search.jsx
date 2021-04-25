import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import {ItemListv2} from './ItemList';

const SearchPage = (props) => {
    const [input, setInput] = useState('');
    const [allItems, setAllItems] = useState();
    const [searchedItems, setSearchedItems] = useState();

    const dummyItems = [{title: "digimon"}, {title: "attack on titan"}, {title: "pokemon"}, {title: "naruto"}, {title: "gurren lagann"}, {title: "new gundam"},]

    const fetchData = async () => {
        // return await fetch('https://restcountries.eu/rest/v2/all')
        //   .then(response => response.json())
        //   .then(data => {
        //      setCountryList(data) 
        //      setCountryListDefault(data)
        //    }
        // );
        // fetch('/items')
        //     .then(res => res.json())
        //     .then(
        //         (result) => {
        //             setAllItems(result);
        //         },
        //         () => {
        //             setAllItems([]);
        //         }
        //     );
        setAllItems(dummyItems);
        setSearchedItems(dummyItems);
        return;
    }

    const updateInput = async (input) => {
        const filtered = allItems.filter(item => {
            return item.title.toLowerCase().includes(input.toLowerCase())
        });
        setInput(input);
        setSearchedItems(filtered);
    }

    useEffect(() => {fetchData()}, []);
	
    return (
        <>
            <h1>Item List</h1>
            <SearchBar 
                query={input} 
                setQuery={updateInput}
            />
            <ItemListv2 itemList={searchedItems}/>
        </>
    );
}

export default SearchPage