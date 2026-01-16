import { useParams, useNavigate } from "react-router-dom"
import data from "../data/Data_Dummy.json"
import { useState, useEffect } from "react";
import Slider from "../assets/svg/sliders.svg"
import arrow_down from "../assets/svg/chevron-down.svg"

// import Product from "../components/ProductsResult.tsx";
import HorizontalScroll from "../components/HorizontalScroll";
import Header from "../components/Header";
// import ProductResult from "../components/ProductsResult.tsx";

export default function SearchResult() {
    const { query } = useParams();
    const decodedQuery = query?.replace(/\+/g, " ").toLowerCase().trim() || "";
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();
    // const filteredProducts = data.ProductsResult.filter((item) => item.name.toLowerCase().includes(decodedQuery || ""));

    useEffect(() => {
        setSearchInput(decodedQuery);
    }, [decodedQuery])

    const filteredProducts = decodedQuery
    ? data.ProductsResult.filter((product) =>
        product.name.toLowerCase().includes(decodedQuery)
      )
    : data.ProductsResult;

    function handleSubmitSearch() {
        const trimmed = searchInput.trim();

        if (trimmed) {
            navigate(`/search-result/${trimmed.replace(/\s+/g, "+")}`);
        } else {
            navigate("/search-result");
        }
    }

    const filterSettings = [
        {
            "Gender > Category" : [
                "Women",
                "Men",
                "Unisex"
            ]
        },
        {
            "Offer" : [
                "Christmas Sale",
                "New Arrival"
            ]
        },
        {
            "Size" : [
                "S",
                "M",
                "L",
                "XL",
                "XXL"
            ]
        },
        {
            "Color" : [
                "Bright",
                "Dark"
            ]
        }
    ]


    return (
        <div>
            <Header searchValue={searchInput} onSearchChange={setSearchInput} onSubmitSearch={handleSubmitSearch} />
            <div>
                <div className="flex">
                    <p className="small ml-10 mt-10 flex items-center gap-[16px]">monarch <div className="bg-[#dedede] w-[6px] h-[6px] rounded-full" /> <span className="text-[#A30303]">Search</span></p>
                </div>
                <div className="flex ml-10 h-[24px] ">
                    <img src={Slider} alt="slider" />
                    <div className="flex">
                        {filterSettings.map((item, i) => (
                            <div className="flex gap-[8px] px-[16px] py-[16px] border border-[#]" key={i}>
                                <h1>{Object.keys(item)[0]}</h1>
                                <img src={arrow_down} alt="image" className="h-[24px]" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <HorizontalScroll title={""} data={filteredProducts} imageHeight={"334px"} eventState={true} CustomEventName="Christmas Sale" CustomBackgroundEvent="#BC5249" scrollToggle={false} />
        </div>
    )
}