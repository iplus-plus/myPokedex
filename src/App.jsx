import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pokemon from "./components/Pokemon";
import PokemonDetail from "./components/PokemonDetail";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import fetchData from "./utils/fetchData";

const App = () => {
    const [url, setUrl] = useState(
        "https://pokeapi.co/api/v2/pokemon/?limit=10&offset=0"
    );
    const [debounced, setDebounced] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const {
        data: pokemons,
        isLoading,
        isError,
        error
    } = useQuery({
        queryKey: ["pokemons", url],
        queryFn: () => fetchData(url),
        keepPreviousData: true
    });

    const { data: single } = useQuery({
        queryKey: ["pokemon-search", debounced],
        queryFn: () =>
            fetchData(`https://pokeapi.co/api/v2/pokemon/${debounced}`),
        enabled: !!debounced
    });
    const [activePokemon, setActivePokemon] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const listData = pokemons?.results || [];
    const singleData = [single?.data] || [];
    const showData = debounced ? singleData : listData;

    

    return (
        <>
            <PokemonDetail
                active={{ setActivePokemon, activePokemon }}
                open={{ isOpen, setIsOpen }}
            />

            <div className="container">
                <div className="content__container">
                    <SearchBar
                        setUrl={setUrl}
                        debounced={debounced}
                        setDebounced={setDebounced}
                    />

                    <ul
                        style={{
                            gridTemplateColumns:
                                debounced &&
                                "repeat(auto-fit, minmax(150px, 30%))"
                        }}
                        className="pokemon__list"
                    >
                        {showData?.map(item => (
                            <Pokemon
                                debounced={debounced}
                                setIsOpen={setIsOpen}
                                active={{ activePokemon, setActivePokemon }}
                                key={crypto.randomUUID()}
                                pokemon={
                                    debounced
                                        ? {
                                              url: `https://pokeapi.co/api/v2/pokemon/${debounced}`
                                          }
                                        : item
                                }
                            />
                        ))}
                    </ul>
                </div>
                {!debounced && (
                    <Pagination page={{currentPage, setCurrentPage}} data={pokemons} setUrl={setUrl} url={url} />
                )}
            </div>
        </>
    );
};

export default App;
