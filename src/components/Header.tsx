import search from "../assets/svg/search.svg"
import cart from "../assets/svg/cart_icon.svg"
import language from "../assets/svg/language_icon.svg"
import wishlist from "../assets/svg/wishlist_icon.svg"
import x from "../assets/svg/x.svg"

import { useState, useEffect } from "react"

export default function Header() {
    const [deleteIcon, setDeleteIcon] = useState(false);
    const [searchInput, setSearchInput] = useState("");

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
                        <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}className="ml-[10px] w-full focus:outline-none" placeholder="Gomu-gomu sherpa fleece jacket" />
                        <img src={search} alt="search" />
                    </div>
                    <img src={wishlist} alt="wishlist" />
                    <img src={cart} alt="cart" />
                    <img src={language} alt="language" />
                    <div className="bg-[#bebebe] w-[40px] h-[40px] rounded-full"></div>
                </div>
            </div>
        </div>
    )
}