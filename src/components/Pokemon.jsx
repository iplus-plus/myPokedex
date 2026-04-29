import React, { useEffect, useState } from "react";
import fetchData from "../utils/fetchData";
import { useQuery } from "@tanstack/react-query";

const Pokemon = ({ pokemon, active, setIsOpen, debounced }) => {
    const { activePokemon, setActivePokemon } = active;
    const { data, isLoading } = useQuery({
        queryKey: ["pokemon", pokemon.url],
        queryFn: () => fetchData(pokemon.url),
        enabled: !!pokemon?.url,
        keepPreviousData: true
    });
    const pokemonTypes = data?.types;
    const firstType = pokemonTypes?.[0].type?.name;
    const handleClick = () => {
        active.setActivePokemon(data);
        setIsOpen(true);
    };
    const pokemonImg = data?.sprites?.other?.home?.front_default;
    useEffect(() => {
        console.log(data);
    }, [data]);
    return (
        <>
            <div 
                onClick={handleClick}
                className={`pokemon ${!isLoading && "show-pokemon"}`}
            >
                <img className="pokeball-img" src="/pokeball.svg" />
                <div
                    style={{
                        "--bg-type": `var(--type-${firstType})`
                    }}
                    className="pokemon__container"
                >
                    <img
                        style={{
                            maxWidth: !pokemonImg && "100px",
                            height: !pokemonImg && "auto"
                        }}
                        onError={e => (e.target.src = "/default.png")}
                        src={pokemonImg || "/default.png"}
                    />
                    <h4 className="pokemon__id"># {data?.id}</h4>
                    <h3 className="pokemon_name">
                        {data?.name?.split("-")[0]}
                        {data?.name?.includes("-") && (
                            <p style={{ fontSize: ".8rem" }}>
                                <em>
                                    ({" "}
                                    {data?.name.split("-").splice(1).join(" ")})
                                </em>
                            </p>
                        )}
                    </h3>

                    <div className="pokemon__types flex">
                        {pokemonTypes?.map(item => (
                            <p
                                style={{
                                    "--type-bg": `var(--type-${item.type.name}-dark)`
                                }}
                                className="pokemon__type"
                                key={item.type.name}
                            >
                                {item?.type?.name}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Pokemon;
