import React from "react";

const SearchResult = ({ searchResults, values, focus, debounce }) => {
    const { debounced, setDebounced } = debounce;
    const { value, setValue } = values;
    const { isFocused, setIsFocused } = focus;
    const filteredResult = searchResults?.results
        .filter(item => item.name.startsWith(value.toLocaleLowerCase()))
        .slice(0, 5);
    const handleClick = (name) => {
        setDebounced(name);
        setIsFocused(false);
        setValue(name);
    };
    return (
        <ul className={`search__result ${isFocused && value && "show-result"}`}>
            {filteredResult?.length === 0 && value && "no data"}
            {value &&
                filteredResult?.map(item => (
                    <li onClick={() => handleClick(item.name)} key={item.name}>
                        {item.name}
                    </li>
                ))}
        </ul>
    );
};

export default SearchResult;
