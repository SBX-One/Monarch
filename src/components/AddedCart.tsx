import cart from "../assets/svg/shopping-cart.svg"

type CartItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  qty: number;
  size: string;
  color: string;
};

const AddedCart = ({}) => {
    return (
        <div className="bg-black/50 w-full h-screen absolute top-45 py-[38px]">
            <div className="absolute w-2/3 left-1/2 rigth-1/2 -translate-x-1/2 h-[760px] bg-white py-[32px] px-[40px] z-100 ">
                <div className="flex justify-between">
                    <h1 className="header-3-medium">Added to Cart</h1>
                    <div className="flex gap-[16px]">
                        <button className="p-[16px] label bg-white border border-[#dedede] rounded-full">Continue Shopping</button>
                        <button className="flex items-center gap-[8px]  bg-black px-[24px] py-[16px] rounded-full">
                            <img src={cart} alt="" />
                            <h1 className="label text-white">View Cart</h1>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddedCart;
