import Item from './Item';

export function ItemList(props) {
    return props.items.map((item) => 
        <Item title={item.title}></Item>
    );
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

