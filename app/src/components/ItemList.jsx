import Item from './Item';
import ItemPage from '../pages/ItemPage'
import { Route, Link, Switch } from "react-router-dom";

export const ItemList = ({itemList=[]}) => {
    console.log(itemList);
    return (
        <> 
            {itemList.map((item) => 
                <Item key={item.title} data={item}/>
            )}
        </>
    )
}

export const ItemListv2 = ({itemList=[]}) => {
    return (
      <>
      { itemList.map((item) => {
          if (item) {
            return (
                <div key={item.title}>
                    <h1>{item.title}</h1>
                </div>	
             )	
           }
           return null
      }) }
      </>
    );
}

