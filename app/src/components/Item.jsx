import { Route, Link } from "react-router-dom";

const Item = ({data}) => {
    return (
        <Link to={"/".concat(data.title)}>
            <div>
                <h1>{data.title}</h1>
                <p>{data.desc}</p>
            </div>
        </Link>
    )
}

export default Item;