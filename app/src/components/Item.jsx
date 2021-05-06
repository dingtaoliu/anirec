import { Route, Link } from "react-router-dom";

const Item = ({data}) => {
    return (
        <Link to={"/item/".concat(data.id)}>
            <div>
                <h1>{data.title}</h1>
                <p>{data.desc}</p>
            </div>
        </Link>
    )
}

export default Item;