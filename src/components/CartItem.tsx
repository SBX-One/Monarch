import ruler from "../assets/svg/ruler.svg"
import plus from "../assets/svg/plus.svg"
import minus from "../assets/svg/minus.svg"
import x from "../assets/svg/x.svg"

interface CartItemProps {
    item: any;
    index: number;
    resolveImage: (path: string) => string;
    formatPrice: (value?: number) => string;
    updateQuantity: (index: number, delta: number) => void;
    removeItem: (index: number) => void;
}

const CartItem = ({ item, index, resolveImage, formatPrice, updateQuantity, removeItem }: CartItemProps) => {
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
                        <img 
                            src={minus} 
                            alt="minus" 
                            className="w-[24px] cursor-pointer" 
                            onClick={() => updateQuantity(index, -1)} 
                        />
                        <h1 className="large">{item.quantity}</h1>
                        <img 
                            src={plus} 
                            alt="plus" 
                            className="w-[24px] cursor-pointer" 
                            onClick={() => updateQuantity(index, 1)} 
                        />
                    </div>
                </div>
            </div>
            <img 
                src={x} 
                alt="close" 
                className="w-[24px] cursor-pointer flex ml-auto mb-auto" 
                onClick={() => removeItem(index)}
            />
        </div>
    )
}

export default CartItem
