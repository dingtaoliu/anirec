import Item from './Item';
import ItemPage from '../pages/ItemPage'
import { Route, Link, Switch } from "react-router-dom";

export const ItemList = ({itemList=[]}) => {
    // console.log(itemList);
    return (
        <> 
            {itemList.map((item) => 
                <Item key={item.id} data={item}/>
            )}
        </>
    )
}


