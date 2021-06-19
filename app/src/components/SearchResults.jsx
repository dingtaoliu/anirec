import React, { useState, useEffect } from 'react';
import { ItemList } from './ItemList';

export const SearchResults = ({ location }) => {
  console.log("RENDERING SEARCH RESULTS");
  const queryParams = new URLSearchParams(location.search);
  const [searchedItems, setSearchedItems] = useState([]);

  useEffect(() => {
    makeQuery(queryParams);
  }, [location]);

  const makeQuery = (queryParams) => {
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
  }

  return (
    <ItemList itemList={searchedItems} />
  )
}