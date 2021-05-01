import {ItemList} from '../components/ItemList';
import React, { useState, useEffect } from 'react';
import { Route, Link, Switch, useHistory } from "react-router-dom";

const ItemPage = ({item}) => {
    console.log(item);
    const [similarItems, setSimilarItems] = useState([])
    // const getSimilarItems = async (id) => {
    //     // return [
    //     //     {title: "SIM 1", desc: "a similar show about something"}, 
    //     //     {title: "SIM 2", desc: "a similar show about something"}, 
    //     //     {title: "SIM 3", desc: "a similar show about something"}, 
    //     //     {title: "SIM 4", desc: "a similar show about something"}, 
    //     // ]
    //     const res = await fetch("/similarItems/" + id);
    //     const data = await res.json();
    //     // console.log(res)
    //     // console.log(data)
    //     return await data.map((record) => {
    //         return {
    //             title: record.title,
    //             desc: record.description
    //         }
    //     })
    // }

    useEffect(async () => {
        const res = await fetch("/similarItems/" + item.id);
        const data = await res.json();
        // console.log(res)
        // console.log(data)
        const items = data.map((record) => {
            return {
                title: record.title,
                desc: record.description
            }
        });
        console.log(items);
        setSimilarItems(items);
    }, [])

    return (
        <>
            <div>
                <h1>THIS IS AN ITEM PAGE</h1>
                <h1>{item.title}</h1>
                <p>{item.desc}</p>
                <ItemList itemList={similarItems}/>
            </div>
            <Switch>
                {similarItems.map((item) => 
                    <Route key={item.id} path={"/".concat(item.title)}> 
                        <ItemPage item={item}/>
                    </Route>
                )}
            </Switch>
        </>
    )
}

export default ItemPage;