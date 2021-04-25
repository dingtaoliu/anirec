import {ItemList} from '../components/ItemList';
 
const ItemPage = ({data}) => {
    const getSimilarItems = () => {
        return [
            {title: "SIM 1", desc: "a similar show about something"}, 
            {title: "SIM 2", desc: "a similar show about something"}, 
            {title: "SIM 3", desc: "a similar show about something"}, 
            {title: "SIM 4", desc: "a similar show about something"}, 
        ]
    }

    const similarItems = getSimilarItems();
    console.log(similarItems);
    return (
        <div>
            <h1>THIS IS AN ITEM PAGE</h1>
            <h1>{data.title}</h1>
            <p>{data.desc}</p>
            <ItemList itemList={similarItems}/>
        </div>
    )
}

export default ItemPage;