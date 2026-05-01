import React, { useRef, useState, useEffect } from "react";
import SearchResult from "./SearchResult";
import { useQuery } from "@tanstack/react-query";
import fetchData from "../utils/fetchData";
import { Search, X } from "lucide-react";

const SearchBar = ({ setUrl, setDebounced, debounced, currentPage }) => {
    const [value, setValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);
    const { data: searchResults } = useQuery({
        queryKey: ["all-pokemon"],
        queryFn: () =>
            fetchData("https://pokeapi.co/api/v2/pokemon/?limit=1350&offset=0"),
        enabled: isFocused,
        staleTime: Infinity
    });
    const handleClick = () => {
        setValue("");
        setDebounced("");
        setUrl(
            `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${
                (currentPage - 1) * 10
            }`
        );
        inputRef.current.focus();
    };
    const handleChange = e => {
        setValue(e.target.value);
        
        if (isFocused && e.target.value === "") {
            setUrl(
                `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${
                    (currentPage - 1) * 10
                }`
            );
            setDebounced("");
        }
    };
    return (
        <div className="searchbar__container flex">
            <SearchResult
                values={{ value, setValue }}
                debounce={{ debounced, setDebounced }}
                searchResults={searchResults}
                focus={{ isFocused, setIsFocused }}
            />
            <div className="search__input flex">
                <Search strokeWidth={3} size={25} color="#dadada" />
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
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
