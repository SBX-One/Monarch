import search from "../assets/svg/search.svg"
import cart from "../assets/svg/cart_icon.svg"
import language from "../assets/svg/language_icon.svg"
import wishlist from "../assets/svg/wishlist_icon.svg"
import x from "../assets/svg/x.svg"
// import data from "../data/Data_Dummy.json"
import clock from "../assets/svg/clock.svg"

import { useState, useEffect } from "react"

export default function Header() {
    const [deleteIcon, setDeleteIcon] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchHistory, setSearchHistory] = useState<boolean>(false);
    // const [searchValue, setSearchValue] = useState<String>("");

    useEffect(() => {
        if (searchInput.length > 0) {
            setDeleteIcon(true);
        } else {
            setDeleteIcon(false);
        }

        
      
    }, [searchInput])

    function handleDeleteIcon() {
        setSearchInput("");
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

    return (
        <div>
            <div className="h-14 flex items-center justify-center">
                <h1 className="text-[#0A0805] satoshi ">CHRISTMAS SALE - UP TO 40% SITEWIDE</h1>
            </div>
            <div className="h-32 flex items-center px-10 border-3 border-y-[#dedede] border-x-0">
                <h1 className="inter-tight text-[#0A0805] header-2-bold mr-20">monarch</h1>
                <div className="flex flex-row bg-full flex-1 gap-[24px]">
                    <div className="flex flex-1 flex-row-reverse py-[10px] h-[44px] rounded-full px-[14px] bg-[#F4F4F4]">
                        {deleteIcon && <img src={x} alt="delete" onClick={handleDeleteIcon} />}
                        <input type="text" value={searchInput} onFocus={handleSearch} onChange={(e) => setSearchInput(e.target.value)}className="ml-[10px] w-full focus:outline-none" placeholder="Gomu-gomu sherpa fleece jacket" />
                        <img src={search} alt="search" />
                    </div>
                    <img src={wishlist} alt="wishlist" />
                    <img src={cart} alt="cart" />
                    <img src={language} alt="language" />
                    <div className="bg-[#bebebe] w-[40px] h-[40px] rounded-full relative"></div>
                        {searchHistory && (
                            <div className="w-full bg-white absolute left-0 top-40 z-30 h-160">
                                <div className="mt-10">
                                    <div className="pl-[230px]">
                                        <h2 className="large">Trending</h2>
                                        <div className="flex gap-[8px] mt-[24px]">
                                            {TrendingSearch.map((item, i) => (
                                                <div key={i} onClick={() => {setSearchInput(item); setSearchHistory(false)}} className="flex flex-row gap-[8px] border border-[#dedede] bg-white hover:bg-gray-300 cursor-default w-fit pl-[14px] pr-[20px] py-[8px] rounded-full">
                                                    <img src={search} alt="trending search" />
                                                    <p>{item}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mx-[230px] mt-10">
                                        <div className="flex items-center justify-between mb-[24px]">
                                            <h2 className="large">Search History</h2>
                                            <p className="text-red-500 underline label cursor-pointer" onClick={handleClearHistory}>clear</p>
                                        </div>
                                        {searchHistoryList && searchHistoryList.map((item, i) => (
                                            <div key={i} className="flex justify-between py-[16px]">
                                                <div className="flex flex-row gap-[16px]">
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