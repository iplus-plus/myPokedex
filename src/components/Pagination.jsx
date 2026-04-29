import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

const Pagination = ({ data, url, setUrl, page }) => {
    const [value, setValue] = useState("");
    const { currentPage, setCurrentPage } = page;
    const totalPage = Math.ceil(data?.count / 10);
    const handleSubmit = e => {
        e.preventDefault();
        const num = Number(value);
        if (isNaN(num)) return;
        const page = Math.min(num, totalPage);
        setUrl(
            `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${
                (page - 1) * 10
            }`
        );
        setCurrentPage(page);
        setValue("");
    };
    const handleNav = (int, task) => {
        setCurrentPage(prev => prev + int);
        setUrl(task);
    };
    return (
        <>
            {data && (
                <div className="pagination flex">
                    <button className="flex"
                        disabled={data?.previous === null}
                        onClick={() => handleNav(-1, data?.previous)}
                    >
                        <ChevronLeft />
                    </button>
                    <form onSubmit={handleSubmit}>
                        <input
                            onChange={e => setValue(e.target.value)}
                            value={value}
                            type="text"
                            placeholder={`${currentPage} / ${totalPage}`}
                        />
                    </form>
                    <button
                        className="flex"
                        disabled={
                            data?.next === null || currentPage === totalPage
                        }
                        onClick={() => handleNav(1, data?.next)}
                    >
                        <ChevronRight />
                    </button>
                </div>
            )}
        </>
    );
};

export default Pagination;
