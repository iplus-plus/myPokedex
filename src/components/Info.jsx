import React from "react";
import Type from "./Type";

const Info = ({ activePokemon }) => {
    const types = activePokemon?.types;
    return (
        <div className="info flex">
            <div className="height__container">
                <h5>{activePokemon?.height * 10} CM</h5>
                <p>height</p>
            </div>
            <div
                style={{ gap: ".5rem", minWidth: "100px", flex: 1 }}
                className="flex"
            >
                {types?.map(item => (
                    <Type type={item} key={item?.type?.name} />
                ))}
            </div>
            <div className="weight__container">
                <h5>{activePokemon?.weight / 10} KG</h5>
                <p>weight</p>
            </div>
        </div>
    );
};

export default Info;
