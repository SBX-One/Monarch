import { useParams, useNavigate } from "react-router-dom"
import data from "../data/Data_Dummy.json"
import { useState, useEffect } from "react";
import Slider from "../assets/svg/sliders.svg"
// import arrow_down from "../assets/svg/chevron-down.svg"

// import Product from "../components/ProductsResult.tsx";
import HorizontalScroll from "../components/HorizontalScroll";
import Header from "../components/Header";
import FILTER_CONFIG from "../components/FilterConfig";
// import { FilterConfig } from "../components/FilterConfig";
import FilterDropdown from "../components/FIlterDropDown";
// import ProductResult from "../components/ProductsResult.tsx";

type Gender = "Women" | "Men" | "Unisex";
type Offer = "Christmas Sale" | "New Arrival" | "none";
type Size = "S" | "M" | "L" | "XL" | "XXL";
type Color = "Bright" | "Dark";

type ActiveFilters = {
    gender: Gender | null;
    offer: Offer | null;
    size: Size | null;
    color: Color | null;
};

export default function SearchResult() {
    const { query } = useParams();
    const decodedQuery = query?.replace(/\+/g, " ").toLowerCase().trim() || "";
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    const [activeFilters, setActiveFilter] = useState<ActiveFilters>({
        size: null,
        gender: null,
        color: null,
        offer: null
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

        // const matchColor = activeFilters.color
        //     ? product. === activeFilters.color
        //     : true;

        return (
            matchSearch &&
            matchGender &&
            matchOffer &&
            matchSize
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
                <div className="flex ml-10 h-[24px] items-center mt-[24px] ">
                    <img src={Slider} alt="slider" className="mr-[24px]" />
                    <div className="flex gap-[8px]">
                        {FILTER_CONFIG.map(filter => (
                            <FilterDropdown
                                key={filter.key}
                                label={filter.label}
                                options={filter.options}
                                value={activeFilters[filter.key]}
                                onSelect={(val) =>
                                    handleFilterChange(filter.key, val)
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>

            <HorizontalScroll title={""} data={filteredProducts} customStyle2={{ justifyContent: "space-between" }} imageHeight={"334px"} eventState={true} CustomEventName="Christmas Sale" CustomBackgroundEvent="#BC5249" scrollToggle={false} />
        </div>
    )
}