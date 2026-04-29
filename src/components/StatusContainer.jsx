import React from "react";

const StatusContainer = ({ status }) => {
    const totalStats = status?.reduce((a, s) => a + s.base_stat, 0);
    
    return (
        <div className="status__container">
            {status?.map(item => (
                <Stats key={item.stat.name} data={item} />
            ))}
            <div
                style={{ gridColumn: "1 / -1", justifyContent: "center" }}
                className="stats flex"
            >
                <h5 className="stat__name">Base Stat Total</h5>
                <p className="stat__number">{totalStats}</p>
            </div>
        </div>
    );
};

const Stats = ({ data }) => {
    const statNumber = data?.base_stat;
    const statName = data?.stat?.name;
    const formatStatName = name => {
        const map = {
            "special-attack": "sp.att",
            "special-defense": "sp.def"
        };

        return map[name] || name;
    };

    return (
        <div className="stats flex">
            <h5 className="stat__name">{formatStatName(statName)}</h5>
            <p className="stat__number">{statNumber}</p>
        </div>
    );
};

export default StatusContainer;
