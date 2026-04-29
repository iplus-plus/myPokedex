import React, { useEffect } from "react";
import { useQueries, useQuery } from "@tanstack/react-query";
import fetchData from "../utils/fetchData";

const Damage = ({ types }) => {
    const results = useQueries({
        queries:
            (types &&
                types?.map(item => ({
                    queryKey: [item.type.name, item.type.url],
                    queryFn: () => fetchData(item.type.url),
                    enabled: !!item?.type?.url
                }))) ||
            []
    });
    const weakType = dmg => {
        const res = new Set(
            (results ?? []).flatMap(
                item =>
                    item?.data?.damage_relations?.[dmg]?.map(t => t.name) || []
            )
        );

        return [...res].map(it => (
            <img key={it} src={`/icon/${it}.svg`} alt={`${it} icon`} />
        ));
    };

    return (
        <div className="damage__container">
            <div className="weak">
                <p
                    style={{
                        "--bg-type3": `var(--type-${types?.[0].type.name})`
                    }}
                >
                    Weak
                </p>
                <div className="icon-list">
                    {results && weakType("double_damage_from")}
                </div>
            </div>
            <div className="effective">
                <p style={{
                        "--bg-type3": `var(--type-${types?.[0].type.name})`
                    }}>Effective</p>
                <div className="icon-list">
                    {results && weakType("double_damage_to")}
                </div>
            </div>
        </div>
    );
};

export default Damage;
