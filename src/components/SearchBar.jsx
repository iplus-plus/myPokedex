import React, { useRef, useState, useEffect } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ setUrl, setDebounced, debounced }) => {
    const [value, setValue] = useState("");
    const inputRef = useRef(null);
    useEffect(() => {
        const debounceTo = setTimeout(() => {
            setDebounced(value);
        }, 500);
        return () => {
            clearInterval(debounceTo);
        };
    }, [value]);
    const handleClick = () => {
        setValue("");
        inputRef.current.focus();
    };
    return (
        <div className="searchbar__container flex">
            <div className="search__input flex">
                <Search strokeWidth={3} size={25} color="#dadada" />
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="Search pokemon by name or id..."
                />
                {value && (
                    <button onClick={handleClick} className="btn__clear flex">
                        <X stroke="#ffffff" size={25} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
