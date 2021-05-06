import {ItemList} from '../components/ItemList';
import React, { useState, useEffect } from 'react';
import { Route, Link, Switch, useHistory, useParams } from "react-router-dom";

const ItemPage = () => {
    let { id } = useParams();
    console.log(id);
    const [item, setItem] = useState({});
    const [similarItems, setSimilarItems] = useState([]);

    useEffect(async () => {
        fetchItem(id);
        fetchSimilarItems(id);
        console.log(item)
        console.log(similarItems)
    }, [id])

    const fetchItem = async (id) => {
        const res = await fetch("/item/" + id);
        const data = await res.json();
        console.log(data);
        setItem({
            id: data.ID,
            title: data.title,
            desc: data.description
        })
    }

    const fetchSimilarItems = async (id) => {
        const res = await fetch("/similarItems/" + id);
        const data = await res.json();
        const items = data.map((record) => {
            return {
                id: record.ID,
                title: record.title,
                desc: record.description
            }
        });
        setSimilarItems(items);
    }

    return (
        <>
            <div>
                <h1>{item.title}</h1>
                <p>{item.desc}</p>
                <ItemList itemList={similarItems}/>
            </div>
            {/* <Route path={"/item/:id"}> 
                    <ItemPage />
            </Route> */}
        </>
    )
}

export default ItemPage;