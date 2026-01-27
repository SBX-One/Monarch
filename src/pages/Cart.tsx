import { useState, useMemo } from "react"
import Header from "../components/Header"
import data from "../data/Data_Dummy.json"
import trash from "../assets/svg/trash.svg"
import down from "../assets/svg/chevron-down-merah.svg"

import CartItem from "../components/CartItem"
import Footer from "../components/Footer"

interface CartItemType {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    size: string;
    color: string;
    quantity: number;
}

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItemType[]>(
        data.Cart.map((item, index) => ({ ...item, quantity: 1, tempId: index })) as any
    );

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

    const updateQuantity = (index: number, delta: number) => {
        setCartItems(prev => prev.map((item, i) => 
            i === index ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
        ));
    };

    const removeItem = (index: number) => {
        setCartItems(prev => prev.filter((_, i) => i !== index));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const subtotal = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }, [cartItems]);

    const totalProducts = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.quantity, 0);
    }, [cartItems]);

    const shippingPrice = subtotal > 0 ? 50000 : 0; // Example shipping price
    const tax = subtotal * 0.1; // 10% tax
    const grandTotal = subtotal + shippingPrice + tax;

    return (
        <div>
            <Header />
            <div className="px-[63px] mt-[44px] flex gap-10 mb-40">
                <div className="w-2/3">
                    <div className="flex justify-between pb-[24px] border-b border-[#E5E5E5]">
                        <h1 className="satoshi text-[24px] font-bold w-fit">Your Cart</h1>
                        <div 
                            className="flex w-[115px] items-center cursor-pointer"
                            onClick={clearCart}
                        >
                            <img src={trash} alt="trash" className="w-[24px]" />
                            <h1 className="satoshi text-[16px] font-bold text-[#A30303]">Clear Cart</h1>
                        </div>
                    </div>
                    <div className="mt-[40px]">
                        {cartItems.length > 0 ? (
                            cartItems.map((item, i) => (
                                <CartItem 
                                    key={`${item.id}-${i}`} 
                                    item={item} 
                                    index={i}
                                    resolveImage={resolveImage} 
                                    formatPrice={formatPrice}
                                    updateQuantity={updateQuantity}
                                    removeItem={removeItem}
                                />
                            ))
                        ) : (
                            <div className="text-center py-20">
                                <h2 className="satoshi text-[20px]">Your cart is empty</h2>
                            </div>
                        )}
                    </div>
                </div>
                <div className="border h-fit border-[#dedede] w-auto flex-1 px-[24px] py-[20px]">
                    <div className="flex justify-between pb-[24px] border-b border-[#dedede]">
                        <h1 className="satoshi text-[24px] font-bold">Order Summary</h1>
                        <h2 className="satoshi text-[24px] font-bold">{totalProducts} Products</h2>
                    </div>
                    <div className="mt-[24px] pb-[24px] border-b border-[#dedede] gap-[4px] flex flex-col">
                        <div className="flex justify-between text-[#6C6B69]">
                            <p>Total Item Price</p>
                            <p>{formatPrice(subtotal)}</p>
                        </div>
                        <div className="flex justify-between text-[#6C6B69]">
                            <p>Shipping</p>
                            <p>{formatPrice(shippingPrice)}</p>
                        </div>
                    </div>
                    <div className="mt-[24px]">
                        <div className="flex justify-between">
                            <h1 className="font-bold text-[18px] satohshi">Total Order</h1>
                            <p className="satoshi font-bold text-[18px] text-[#A30303]">{formatPrice(grandTotal)}</p>
                        </div>
                        <div className="flex justify-between pb-[24px] border-b border-[#dedede]">
                            <p className="text-[#6C6B69] text-[16px]">include tax (10%)</p>
                            <p className="text-[#6C6B69] text-[16px]">{formatPrice(tax)}</p>
                        </div>
                        <div className="flex flex-col gap-[16px] mt-[32px]">
                            <div className="gap-[8px] flex flex-col">
                                <div className="flex gap-[8px]">
                                    <p className="body-regular text-[#A30303]">Have a promo code?</p>
                                    <img src={down} alt="down" className="w-[24px]" />
                                </div>
                                <input className="w-full h-[44px] bg-[#f4f4f4] pl-[16px]" placeholder="Enter promo code" type="text" />
                            </div>
                            <div className="gap-[8px] flex flex-col">
                                <div className="flex gap-[8px]">
                                    <p className="body-regular text-[#A30303]">Have a gift card?</p>
                                    <img src={down} alt="down" className="w-[24px]" />
                                </div>
                                <div className="flex gap-[8px]">
                                    <input className="w-[70%] h-[44px] bg-[#f4f4f4] pl-[16px]" placeholder="Enter promo code" type="text" />
                                    <input className="w-[30%] h-[44px] bg-[#f4f4f4] pl-[16px]" placeholder="PIN" type="text" />
                                </div>
                            </div>
                            <button className="w-full h-[56px] bg-[#0A0805] text-white label mt-[32px]">Checkout</button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer></Footer>
        </div>
    )
}

export default Cart
