import React from "react";

const Type = ({ type }) => {
    return (
        <div className="type_container">
            <img src={`./icon/${type?.type?.name}.svg`} />
            <p>{type?.type?.name}</p>
        </div>
    );
};

export default Type;
