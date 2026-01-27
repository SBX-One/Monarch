import cart from "../assets/svg/shopping-cart.svg";
import ruler from "../assets/svg/ruler.svg";

import HorizontalScroll from "./HorizontalScroll";
import data from "../data/Data_Dummy.json";
import { Link } from "react-router-dom";

type AddedCartProps = {
  productImage: string;
  productName: string;
  quantity: number;
  price: number;
  size: string;
  color: string;
  onClose: () => void;
  wishlist?: boolean;
};

const AddedCart = ({
  productImage,
  productName,
  quantity,
  price,
  size,
  color,
  onClose,
  wishlist,
}: AddedCartProps) => {
  const resolveImage = (path: string) => {
    try {
      return new URL(path, import.meta.url).href;
    } catch {
      return path;
    }
  };

  const formatPrice = (value?: number) => {
    if (value == null) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
      <div className="w-2/3 bg-white py-[32px] px-[40px] z-100 relative">
        <div className="flex justify-between items-center">
          <h1 className="header-3-medium">
            {wishlist ? "Added to Wishlist" : "Added to Cart"}
          </h1>
          <div className="flex gap-[16px]">
            <button
              onClick={onClose}
              className="p-[16px] label bg-white border border-[#dedede] rounded-full"
            >
              Continue Shopping
            </button>
            <button className="flex items-center gap-[8px] bg-black px-[24px] py-[16px] rounded-full">
              <img src={cart} alt="" />
              <Link to="/cart">
                <h1 className="label text-white">
                  {"View Cart"}
                </h1>
              </Link>
            </button>
          </div>
        </div>
        <div className="mt-8 flex bg-[#F4F4F4]">
          <img
            src={resolveImage(productImage)}
            alt={productName}
            className="w-[146px]"
          />
          <div className="ml-8 w-full flex flex-row justify-between">
            <div className="w-[231px] flex flex-col gap-[8px] my-auto">
              <h2 className="text-[16px] font-medium satoshi">{productName}</h2>
              <p className="list text-[#6C6B69]">Quantity: {quantity}</p>
              <p className="large text-[#A30303]">
                {formatPrice(price * quantity)}.00
              </p>
            </div>
            <div className="flex flex-col gap-[8px] w-[118px] mt-[32px] mr-[40px]">
              <div className="flex gap-[12px]">
                <img src={ruler} alt="ruler" />
                <p className="text-[#6C6B69] list">Size: {size}</p>
              </div>
              <div className="flex gap-[12px] ml-1">
                <div className={`w-[16px] h-[16px] rounded-full bg-${color.toLowerCase()}`} />
                <p className="text-[#6C6B69] list">Color: {color}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <HorizontalScroll marginTop={"64px"}  productSettings={false} CustomBackgroundEvent="#BC5249" CustomEventName="Christmas Sale" eventState={false} title={"Recently Viewed"} data={data.products} customStyle={{marginRight : "-40px", marginLeft: "-40px", paddingLeft : "40px", gap : "8px"}} customStyle2={{maxHeight: "500px", minHeight: "342px"}} imageHeight={"200px"} CustomTextStyle={{ width : "200px", textAlign : "left"}} />
        </div>
      </div>
    </div>
  );
};

export default AddedCart;
