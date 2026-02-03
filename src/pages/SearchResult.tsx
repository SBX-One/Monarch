import { useParams, useNavigate } from "react-router-dom"
import data from "../data/Data_Dummy.json"
import { useState, useEffect } from "react";
import Slider from "../assets/svg/sliders.svg"
// import arrow_down from "../assets/svg/chevron-down.svg"

// import Product from "../components/ProductsResult.tsx";
// import HorizontalScroll from "../components/HorizontalScroll";
import ProductResult from "../components/ProductResult";
import Header from "../components/Header";
import FILTER_CONFIG from "../components/FilterConfig";
// import { FilterConfig } from "../components/FilterConfig";
import FilterDropdown from "../components/FIlterDropDown";
// import ProductResult from "../components/ProductsResult.tsx";

import type { Gender, Offer, Size, Color, PriceRange } from "../components/FilterConfig";

type ActiveFilters = {
    gender: Gender | null;
    offer: Offer | null;
    size: Size | null;
    color: Color | null;
    price: PriceRange | null;
};

export default function SearchResult() {
    const { query } = useParams();
    const decodedQuery = query?.replace(/\+/g, " ").toLowerCase().trim() || "";
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 480);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const [activeFilters, setActiveFilter] = useState<ActiveFilters>({
        size: null,
        gender: null,
        color: null,
        offer: null,
        price: null
    })
    // const filteredProducts = data.ProductsResult.filter((item) => item.name.toLowerCase().includes(decodedQuery || ""));

    function handleFilterChange<K extends keyof ActiveFilters>(
        key: K,
        value: ActiveFilters[K]
    ) {
        setActiveFilter(prev => ({
            ...prev,
            [key]: value,
        }));
    }

    const filteredProducts = data.ProductsResult.filter(product => {
        const matchSearch = decodedQuery
            ? product.name.toLowerCase().includes(decodedQuery)
            : true;

        const matchGender = activeFilters.gender
            ? product.gender === activeFilters.gender
            : true;

        const matchOffer = activeFilters.offer
            ? product.offer === activeFilters.offer
            : true;

        const matchSize = activeFilters.size
            ? product.size === activeFilters.size
            : true;

        const matchPrice = activeFilters.price
            ? (activeFilters.price === "Under 1.000.000" ? product.price < 1000000 
               : activeFilters.price === "1.000.000 - 2.000.000" ? (product.price >= 1000000 && product.price <= 2000000)
               : activeFilters.price === "Above 2.000.000" ? product.price > 2000000
               : true)
            : true;

        // const matchColor = activeFilters.color
        //     ? product. === activeFilters.color
        //     : true;

        return (
            matchSearch &&
            matchGender &&
            matchOffer &&
            matchSize &&
            matchPrice
            // matchColor
        );
    });



    useEffect(() => {
        setSearchInput(decodedQuery);
    }, [decodedQuery])

    // const filteredProducts = decodedQuery
    // ? data.ProductsResult.filter((product) =>
    //     product.name.toLowerCase().includes(decodedQuery)
    //   )
    // : data.ProductsResult;

    function handleSubmitSearch() {
        const trimmed = searchInput.trim();

        if (trimmed) {
            navigate(`/search-result/${trimmed.replace(/\s+/g, "+")}`);
        } else {
            navigate("/search-result");
        }
    }


    return (
        <div className="h-screen">
            <Header searchValue={searchInput} onSearchChange={setSearchInput} onSubmitSearch={handleSubmitSearch} />
            <div>
                <div className="flex">
                    <p className="small ml-10 mt-10 flex items-center gap-[16px]">monarch <div className="bg-[#dedede] w-[6px] h-[6px] rounded-full" /> <span className="text-[#A30303]">Search</span></p>
                </div>
                <div className="flex ml-10 items-center mt-[24px] pb-[24px] border-b border-[#dedede]">
                    <img src={Slider} alt="slider" className="mr-[24px] shrink-0" />
                    <div className="flex gap-[8px] overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap flex-1 py-4 pb-[200px] mb-[-200px]">
                        {FILTER_CONFIG.map(filter => (
                            <div key={filter.key} className="shrink-0">
                                <FilterDropdown
                                    label={filter.label}
                                    options={filter.options}
                                    value={activeFilters[filter.key]}
                                    onSelect={(val) =>
                                        handleFilterChange(filter.key, val)
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mx-auto">
                <ProductResult 
                    title="" 
                    data={filteredProducts} 
                    imageWidth={isMobile ? "196px" : "334px"} 
                    imageHeight={isMobile ? "250px" : "334px"} 
                    imageGap="24px"
                    justify="start"
                    textWidth={isMobile ? "196px" : "300px"}
                />
            </div>
        </div>
    )
}