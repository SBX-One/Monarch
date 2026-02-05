import search from "../assets/svg/search.svg"
import cart from "../assets/svg/cart_icon.svg"
import language from "../assets/svg/language_icon.svg"
import wishlist from "../assets/svg/wishlist_icon.svg"
import arrowDown from "../assets/svg/chevron-down.svg"
import x from "../assets/svg/x.svg"
import burger from "../assets/svg/burger.svg"
// import data from "../data/Data_Dummy.json"
import clock from "../assets/svg/clock.svg"
import chevronDown from "../assets/svg/chevron-down.svg"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
// import { useNavigate } from "react-router-dom"

type HeaderProps = {
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    onSubmitSearch?: () => void
}

export default function Header({searchValue = "", onSearchChange, onSubmitSearch}: HeaderProps ) {
    const [deleteIcon, setDeleteIcon] = useState(false);
    // const [searchInput, setSearchInput] = useState("");
    const [searchHistory, setSearchHistory] = useState<boolean>(false);
    // const navigate = useNavigate();
    // const [searchValue, setSearchValue] = useState<String>("");

    useEffect(() => {
        setDeleteIcon(searchValue.length > 0);
    }, [searchValue])

    function handleDeleteIcon() {
        onSearchChange?.("");
    }

    function handleSearch() {
        setSearchHistory(!searchHistory)
    }

    const TrendingSearch = [
        "One Piece Hat",
        "Christmas Essencial",
        "Bleach Neckleace",
        "Sale",
        "Limited Edition"
    ]
    
    const [searchHistoryList, setSearchHistoryList] = useState<string[]>([
        "Fleece Jacket",
        "Gomu-gomu sherpa fleece jacket",
        "One Piece Hat"
    ])

    function handleRemoveHistory(index: number) {
        setSearchHistoryList(prev => prev.filter((_, i) => i !== index))
    }

    function handleClearHistory() {
        setSearchHistoryList([])
    }

    // function handleSubmitSearch() {
    //     // if (!searchInput.trim()) return;
        
    //       const formattedQuery = searchInput.trim().replace(/\s+/g, "+");
    //     navigate(`/search-result/${formattedQuery}`);
    //     setSearchHistory(false);
    // }

    return (
        <div>
            <div className="h-14 flex items-center justify-center">
                <h1 className="text-[#0A0805] satoshi ">CHRISTMAS SALE - UP TO 40% SITEWIDE</h1>
            </div>
            <div className=" flex max-[480px]:flex-col items-center border-3 border-y-[#dedede] border-x-0">
                <div className="flex flex-row bg-full flex-1 gap-[24px] items-center px-6 min-[480px]:px-10">
                    <Link to="/">
                        <h1 className="inter-tight text-[#0A0805] header-2-bold max-[480px]:hidden shrink-0">monarch</h1>
                    </Link>
                    <div className="flex flex-col mt-[24px] min-[480px]:mt-0 min-[480px]:flex-row-reverse flex-1 gap-[24px]">
                        <div className="flex gap-[24px] items-center shrink-0 max-[480px]:hidden">
                            <Link to="/">
                                <h1 className="inter-tight text-[#0A0805] header-2-bold mr-20 min-[480px]:hidden">monarch</h1>
                            </Link>
                            <img src={wishlist} alt="wishlist" className="shrink-0"/>
                            <Link to="/cart" className="shrink-0">
                                <img src={cart} alt="cart" className="" />
                            </Link>
                            <img src={burger} alt="burger menu" className="min-[480px]:hidden w-[24px] shrink-0"/>
                        </div>
                        <div className="flex flex-row gap-[10px] flex-1">
                            <img src={chevronDown} alt="" className="rotate-90 w-[24px] h-[24px] mt-3 min-[480px]:hidden  " />
                            <div className="mb-[24px] min-[480px]:my-10 flex flex-1 flex-row-reverse py-[10px] max-h-[44px] w-full rounded-full px-[14px] bg-[#F4F4F4]">
                                {deleteIcon && <img src={x} alt="delete" onClick={handleDeleteIcon} />}
                                <input type="text" value={searchValue} onFocus={handleSearch} onKeyDown={(e) => {if (e.key === "Enter") onSubmitSearch?.()}} onChange={(e) => onSearchChange?.(e.target.value)} className="ml-[10px] w-full focus:outline-none" placeholder="Gomu-gomu sherpa fleece jacket" />
                                <img src={search} alt="search" className="w-[20px]" />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-[24px] shrink-0">
                        <div className="max-[480px]:hidden flex flex-row items-center gap-[12px] p-[10px] border border-[#dedede] rounded-full">
                            <img src={language} alt="language" />
                            <h1 className="label">IDN</h1>
                            <img src={arrowDown} alt="arrow down" />
                        </div>
                        <div className="max-[480px]:hidden bg-[#bebebe] w-[40px] h-[40px] rounded-full relative"></div>
                    </div>
                        {searchHistory && (
                            <div className="w-full bg-white absolute left-0 min-[480px]:top-40 top-35 z-30 h-160">
                                <div className="mt-10">
                                    <div className="mx-auto w-full max-w-[1240px] flex-col px-10">
                                        <h2 className="large">Trending</h2>
                                        <div className="flex gap-[8px] mt-[24px] overflow-x-auto scroll">
                                            {TrendingSearch.map((item, i) => (
                                                <div key={i} onClick={() => {onSearchChange?.(item); setSearchHistory(false)}} className="flex flex-row gap-[8px] border border-[#dedede] bg-white hover:bg-gray-300 cursor-default w-fit pl-[14px] pr-[20px] py-[8px] rounded-full shrink-0">
                                                    <img src={search} alt="trending search" className="w-[20px]" />
                                                    <p>{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mx-auto w-full max-w-[1240px] mt-10 px-10">
                                        <div className="flex items-center justify-between mb-[24px]">
                                            <h2 className="large">Search History</h2>
                                            <p className="text-red-500 underline label cursor-pointer" onClick={handleClearHistory}>clear</p>
                                        </div>
                                        {searchHistoryList && searchHistoryList.map((item, i) => (
                                            <div key={i} className="flex justify-between items-center py-[16px] w-full border-b border-[#F4F4F4]">
                                                <div className="flex flex-row gap-[16px] items-center">
                                                    <img src={clock} alt="search history" />
                                                    <p className="body-regular">{item}</p>
                                                </div>
                                                <img src={x} alt="remove history" onClick={() => handleRemoveHistory(i)} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}