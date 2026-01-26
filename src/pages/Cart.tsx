import Header from "../components/Header"
import data from "../data/Data_Dummy.json"
import trash from "../assets/svg/trash.svg"
import ruler from "../assets/svg/ruler.svg"
import plus from "../assets/svg/plus.svg"
import minus from "../assets/svg/minus.svg"
import x from "../assets/svg/x.svg"

import { useState } from "react"

const CartItem = ({ item, resolveImage, formatPrice }: { item: any, resolveImage: (path: string) => string, formatPrice: (value?: number) => string }) => {
    const [itemCounter, setItemCounter] = useState<number>(1);

    return (
        <div className="flex mb-[40px] pb-[24px] border-b border-[#E5E5E5]">
            <img src={resolveImage(item.image)} alt="cart" className="object-cover w-[278px] h-[296px]" />
            <div className="ml-[24px] flex flex-col justify-between">
                <div>
                    <h4 className="header-4-medium w-[230px]">{item.name}</h4>
                    <div className="flex flex-col my-[24px]">
                        <div className="flex items-center gap-[8px]">
                            <img src={ruler} alt="ruler" className="w-[24px]" />
                            <h4 className="list"> Size: {item.size}</h4>
                        </div>
                        <div className="flex items-center gap-[8px] ml-1 mt-[4px]">
                            <div className="w-[16px] h-[16px] rounded-full bg-[#000000]" />
                            <h4 className="list ml-1"> Color: {item.color}</h4>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between items-center w-[404px] flex-col gap-[16px]">
                    <h3 className="header-3-medium text-[#A30303] mr-auto">{formatPrice(item.price)},00 IDR</h3>
                    <div className="flex w-[145px] justify-between items-center p-[12px] border border-[#dedede] mr-auto">
                        <img src={minus} alt="minus" className="w-[24px] cursor-pointer" onClick={() => setItemCounter(Math.max(1, itemCounter - 1))} />
                        <h1 className="large">{itemCounter}</h1>
                        <img src={plus} alt="plus" className="w-[24px] cursor-pointer" onClick={() => setItemCounter(itemCounter + 1)} />
                    </div>
                </div>
            </div>
            <img src={x} alt="close" className="w-[24px] cursor-pointer flex ml-auto mb-auto" />
        </div>
    )
}

const Cart = () => {
    const resolveImage = (path: string) => {
        try {
            return new URL(path, import.meta.url).href
        } catch {
            return path
        }
    }

    const formatPrice = (value?: number) => {
        if (value == null) return '';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div>
            <Header />
            <div className="px-[63px] mt-[44px]">
                <div className="w-2/3">
                    <div className="flex justify-between pb-[24px] border-b border-[#E5E5E5]">
                        <h1 className="satoshi text-[24px] font-bold w-fit">Your Cart</h1>
                        <div className="flex w-[115px] items-center cursor-pointer">
                            <img src={trash} alt="trash" className="w-[24px]" />
                            <h1 className="satoshi text-[16px] font-bold text-[#A30303]">Clear Cart</h1>
                        </div>
                    </div>
                    <div className="mt-[40px]">
                        {data.Cart.map((item, i) => (
                            <CartItem key={i} item={item} resolveImage={resolveImage} formatPrice={formatPrice} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
