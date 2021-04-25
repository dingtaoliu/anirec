const SearchBar = ({makeQuery}) => {
    const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
    return (
      <input 
       style={BarStyling}
       placeholder={"search items"}
      //  onChange={(e) => setQuery(e.target.value)}
       onKeyDown={(e) => {
         if (e.key === 'Enter') {
           makeQuery(e.target.value)
         }
       }}
      />
    );
}

export default SearchBar;