import { Route, Link, Switch, useHistory, useParams } from "react-router-dom";

const SearchBar = () => {
  const BarStyling = { width: "20rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
  const history = useHistory()
  const setQueryUrl = (query) => {
    const queryParams = new URLSearchParams();
    if (query) {
      queryParams.append("query", query)
    }
    history.push({
      pathname: '/search/',
      search: queryParams.toString()
    });
  }

  return (
    <input
      style={BarStyling}
      placeholder={"search items"}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          setQueryUrl(e.target.value)
        }
      }}
    />
  );
}

export default SearchBar;