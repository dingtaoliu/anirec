const SearchBar = ({query, setQuery}) => {
    const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
    return (
      <input 
       style={BarStyling}
       value={query}
       placeholder={"search items"}
       onChange={(e) => setQuery(e.target.value)}
      />
    );
}

export default SearchBar;