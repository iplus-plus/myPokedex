import React, { useEffect } from "react";

import StatusContainer from "./StatusContainer";
import Damage from "./Damage";
import Info from "./Info";
import { X } from "lucide-react";

const PokemonDetail = ({ open, active }) => {
    const { activePokemon, setActivePokemon } = active;
    const { isOpen, setIsOpen } = open;
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const handleClose = () => {
        setTimeout(() => {
            setActivePokemon("");
        }, 300);
        setIsOpen(false);
    };
    const bgContainer = {
        "--bg-type2": `var(--type-${activePokemon?.types?.[0]?.type?.name}-dark)`
    };
    const pokemonImg =
        activePokemon?.sprites?.other?.["official-artwork"]?.front_default;

    return (
        <div className={`modal-container ${isOpen ? "modal-active" : ""}`}>
            <div style={bgContainer} className="pokemon__detail flex">
                <button onClick={handleClose} className="btn-close flex">
                    <X />
                </button>
                <img
                    style={{ maxWidth: pokemonImg === null && "200px" }}
                    src={pokemonImg || "/default.png"}
                />

                <h3 className="pokemon__name">
                    {activePokemon?.name?.split("-")[0]}
                    {activePokemon?.name?.includes("-") && (
                        <p style={{ fontSize: "1rem" }}>
                            <em>
                                (
                                {activePokemon?.name
                                    .split("-")
                                    .splice(1)
                                    .join(" ")}
                                )
                            </em>
                        </p>
                    )}
                </h3>

                <Info activePokemon={activePokemon} />
                <StatusContainer status={activePokemon?.stats} />
                <Damage types={activePokemon?.types} />
            </div>
        </div>
    );
};

export default PokemonDetail;
