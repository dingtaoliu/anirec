import Item from './Item';

function ItemList(props) {
    return props.items.map((item) => 
        <Item title={item.title}></Item>
    );
}

export default ItemList;