import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import data from "../data/Data_Dummy.json"
import ruler from "../assets/svg/ruler.svg"
import plus from "../assets/svg/plus.svg"
import minus from "../assets/svg/minus.svg"
import messageIcon from "../assets/svg/message-square.svg"
import shareIcon from "../assets/svg/share-2.svg"
import starIcon from "../assets/svg/star.svg"
import x from "../assets/svg/x.svg"

import starRating from "../assets/svg/star_rating.svg"
import starRatingEmpty from "../assets/svg/star_rating_empty.svg"
import HorizontalScroll from "../components/HorizontalScroll"
import AddedCart from "../components/AddedCart"

import komentar from "../data/KomentarDummy.json"

type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    eventType?: string;
    gender?: string;
    offer?: string;
    size?: string;
    previewImage?: string[];
    stock?: number;
    maintaining?: boolean;
    maintainingInstruction?: string;
    NormalPrice?: number;
    FeatureContent?: {
        name: string;
        image: string;
    }[];
    Detail?: (string | { "Function Detail": string[] })[];
    Production?: {
        name: string;
        country: string;
        description: string;
    }
    MaintainingInstruction?: string;
}

const ProductDetail = () => {
    const { id } = useParams();
    // const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("Black");
    const [selectedSize, setSelectedSize] = useState<string>("M");
    const [itemCounter, setItemCounter] = useState<number>(1);
    const [maintaining, setMaintaining] = useState<boolean>(true);
    const [feature, setFeature] = useState<boolean>(true);
    const [detail, setDetail] = useState<boolean>(true);
    const [production, setProduction] = useState<boolean>(true);
    const [wishlist, setWishlist] = useState<boolean>(false);

    useEffect(() => {
        if (!wishlist) return;

        const scrollY = window.scrollY;

        // balikin view ke atas biar modal konsisten
        window.scrollTo({ top: 0 });

        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";

        return () => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.width = "";

            window.scrollTo(0, scrollY);
        };
    }, [wishlist]);


    useEffect(() => {
        // Find product from ProductsResult array
        const foundProduct = data.ProductsResult.find(
            (item) => item.id === Number(id)
        );

        if (foundProduct) {
            setProduct(foundProduct as Product);
            setSelectedImage(foundProduct.image);
        }
    }, [id]);

    const resolveImage = (path: string) => {
        try {
            return new URL(path, import.meta.url).href;
        } catch {
            return path;
        }
    };

    const formatPrice = (value?: number) => {
        if (value == null) return '';
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0
        }).format(value);
    };

    if (!product) {
        return (
            <div>
                <Header />
                <div className="flex justify-center items-center h-screen">
                    <p className="large">Product not found</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {wishlist && (
                <AddedCart
                    productImage={product.image}
                    productName={product.name}
                    quantity={itemCounter}
                    price={product.price}
                    size={selectedSize}
                    color={selectedColor}
                    onClose={() => setWishlist(false)}
                    wishlist={true}
                />
            )}
            <Header />
            <div className="px-10 py-10">
                <div className="flex">
                    <p className="small flex items-center gap-[16px]">
                        <Link to="/search-result" className="hover:text-[#A30303]">monarch</Link>
                        <div className="bg-[#dedede] w-[6px] h-[6px] rounded-full" />
                        <span className="text-[#A30303]">{product.name}</span>
                    </p>
                </div>

                <div className="flex gap-10 mt-10 ">
                    {/* Product Images */}
                    <div className="w-auto">
                        <div
                            className="w-[427px] h-[528px] bg-cover bg-center bg-no-repeat mb-4"
                            style={{ backgroundImage: `url(${resolveImage(selectedImage)})` }}
                        >
                        </div>

                        {/* Preview Images */}
                        {product.previewImage && product.previewImage.length > 0 && (
                            <div className="flex gap-[8px] overflow-x-auto">
                                {product.previewImage.map((img, index) => (
                                    <div
                                        key={index}
                                        className="w-[136px] h-[142px] bg-cover bg-center bg-no-repeat cursor-pointer border-2 hover:border-[#A30303]"
                                        style={{
                                            backgroundImage: `url(${resolveImage(img)})`,
                                            borderColor: selectedImage === img ? '#A30303' : 'transparent'
                                        }}
                                        onClick={() => setSelectedImage(img)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="w-[426px] ">
                        {product.offer && product.offer !== "none" && (
                            <div className="mb-6">
                                <div className="bg-[#BC5249] text-white px-4 py-2 w-fit rounded-full">
                                    <p className="subtle">{product.offer}</p>
                                </div>
                            </div>
                        )}
                        <div>
                            <h1 className="header-3-medium">{product.name}</h1>
                            {product.id && (
                                <div className="mt-2">
                                    <p className="body-regular">{product.id}</p>
                                </div>
                            )}
                        </div>
                        <p className="text-2xl text-[#A30303] mb-[32px] header-3-medium mt-[24px]">
                            {formatPrice(product.price)}.00
                            <span className="text-gray-500 line-through opacity-50 ml-2">{formatPrice(product.NormalPrice)}.00</span>
                        </p>

                        <div className="flex flex-col">
                            <p className="large mb-[16px]">Color</p>
                            <div className="flex gap-[10px]">
                                {data.colorSetting.map((item, index) => (
                                    <div 
                                        key={index}
                                        onClick={() => setSelectedColor(item.name)}
                                        className={`border-2 rounded-full p-[2px] cursor-pointer ${
                                            selectedColor === item.name ? 'border-[#A30303]' : 'border-transparent'
                                        }`}
                                    >
                                        <img
                                            src={resolveImage(item.image)}
                                            alt={item.name}
                                            className="w-[40px] h-[40px] hover:opacity-80"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {product.size && (
                            <div className="mb-4 mt-[32px]">
                                <p className="large mb-4">Size</p>
                                <div className="flex gap-2">
                                    {product.size.split(',').map((size, index) => (
                                        <div
                                            key={index}
                                            onClick={() => setSelectedSize(size.trim())}
                                            className={`border px-4 py-2 cursor-pointer ${
                                                selectedSize === size.trim() 
                                                    ? 'border-[#A30303] bg-[#A30303] text-white' 
                                                    : 'border-gray-300 hover:border-[#A30303]'
                                            }`}
                                        >
                                            {size.trim()}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex gap-2 mt-[30px]">
                            <img src={ruler} alt="" />
                            <p className="label text-[#6C6B69]">Size Charts</p>
                        </div>
                    </div>
                    <div className="w-[426px] px-[24px] py-[20px] border border-[#dedede] h-fit ml-auto">
                        <h1 className="large">Set amount and notes</h1>

                        <div className="flex items-center gap-4 mt-[24px] pb-[24px] border border-b-[#dedede] border-x-[#00000000] border-t-[#00000000]">
                            <img src={resolveImage(product.image)} className="h-[80px]" alt="" />
                            <p className="large">
                                {selectedColor && `${selectedColor}`}
                                {selectedColor && selectedSize && `, ${selectedSize}`}
                            </p>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-[24px] pb-2 mt-[24px]">
                                 <div className="w-[145px] p-[16px] border border-[#dedede] flex justify-between">
                                    <img src={minus} alt="minus" onClick={() => setItemCounter(itemCounter - 1)} />
                                    <p className="large">{itemCounter}</p>
                                    <img src={plus} alt="plus" onClick={() => setItemCounter(itemCounter + 1)} />
                                </div>
                                <p className="small">Stock: <span className="large">{product.stock}</span></p>
                            </div>
                            
                            <div className="flex justify-between mt-[24px]">
                                <p className="large">Subtotal</p>
                                <p className="header-3-medium text-[#A30303]">{formatPrice(product.price * itemCounter)}.00</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-[24px]">
                            <button className="text-white bg-[#0A0805] w-full h-[56px]"  onClick={() => {setWishlist(!wishlist)}}>Add to Cart</button>
                            <button className="text-[#0A0805] border border-[#dedede] w-full h-[56px]">Buy Now</button>
                        </div>
                        <div className="flex items-center justify-between w-full mt-[24px]">
                            <div className="flex gap-4 p-[8px]">
                                <img src={messageIcon} alt="message" />
                                <p className="label text-[#585858]">Message</p>
                            </div>
                            <div className="flex gap-4 p-[8px]">
                                <img src={starIcon} alt="star" />
                                <p className="label text-[#585858]">Wishlist</p>
                            </div>
                            <div className="flex gap-4 p-[8px]">
                                <img src={shareIcon} alt="share" />
                                <p className="label text-[#585858]">Share</p>
                            </div>
                        </div>
                    </div>
                </div>
            
            <section id="instruction">
                {maintaining && (
                    <div className="w-2/3 mt-[80px]" >
                        <div className="flex justify-between pt-[16px] pb-[20px] px-[20px] border border-[#dedede] rounded-t-[12px]">
                            <p className="large">Maintaining Instruction</p>
                            <img src={x} alt="x" onClick={() => setMaintaining(false)} />
                        </div>
                        <div className="pt-[16px] pb-[20px] px-[20px] border bg-[#F4F4F4] border-[#dedede] rounded-b-[12px]">
                            <p className="body-regular text-[#6C6B69]">{product.MaintainingInstruction}</p>
                        </div>
                    </div>
                )}
            </section>

            <section>
                <div className="mt-[80px] pb-[24px] border-b border-[#dedede] w-2/3" onClick={() => setDetail(!detail)}>
                    <h1 className="large">Description</h1>
                    <p className="body-regular mt-2">Product Code: {product.id}</p>
                </div>
                <div>
                    <div className="flex justify-between w-2/3 py-[16px]" onClick={() => setFeature(!feature)}>
                        <h1 className="large">Feature</h1>
                        <img src={minus} alt="minus" />
                    </div>
                    <div className="w-2/3">
                        {feature && (
                            <div className="flex flex-row gap-[24px] pb-[24px] border-b border-[#dedede]">
                                {product.FeatureContent?.map((item, i) => (
                                    <div key={i} className="flex flex-row gap-[16px]">
                                        <img className="h-[209px] w-fit" src={resolveImage(item.image)} alt={item.name} />
                                        <p className="body-regular w-[209px]">{item.name}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div>
                        <div className="flex justify-between w-2/3 py-[16px]" onClick={() => setDetail(!detail)}>
                            <h1 className="large">Detail</h1>
                            <img src={minus} alt="minus" />
                        </div>
                        <div className="w-2/3">
                            {detail && (
                                <div className="flex flex-col gap-4 pb-[24px] border-b border-[#dedede]">
                                    {product.Detail?.map((item, i) => {
                                        if (typeof item === 'string') {
                                            return (
                                                <p key={i} className="body-regular text-[#6C6B69]">{item}</p>
                                            );
                                        } else if (typeof item === 'object' && 'Function Detail' in item) {
                                            return (
                                                <div key={i} className="flex flex-col gap-2 mt-2">
                                                    <p className="body-regular">Function Detail</p>
                                                    {item['Function Detail'].map((detail, j) => (
                                                        <p key={j} className="body-regular text-[#6C6B69]">{detail}</p>
                                                    ))}
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between w-2/3 py-[16px]" onClick={() => setProduction(!production)}>
                        <h1 className="large">Production</h1>
                        <img src={minus}  alt="" />
                    </div>
                    <div className="w-2/3">
                        {production && product.Production && (
                            <div className="flex flex-col gap-4 pb-[24px] border-b border-[#dedede]">
                                <p className="body-regular">{product.Production.name}</p>
                                <div className="flex gap-2">
                                    <p className="body-regular">Country/Country of Production:</p>
                                    <p className="body-regular text-[#6C6B69]">{product.Production.country}</p>
                                </div>
                                <p className="body-regular text-[#6C6B69] w-3/4">{product.Production.description}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section id="comment">
                <div className="w-2/3">
                    <div className="mt-[24px]">
                        {komentar.map((item, i) => (
                            <div key={i} className="border-b border-[#dedede] mt-[24px]">
                                {/* title comment */}
                                <h1 className="header-3-medium">"{item.title}"</h1>
                                {/* star rating */}
                                <div className="flex gap-[4px] mb-[12px] mt-[16px] relative w-fit">
                                    {[...Array(5)].map((_, index) => (
                                        <img 
                                            key={index} 
                                            src={index < item.star ? starRating : starRatingEmpty} 
                                            alt="star"
                                            className="w-[16px] h-[16px]"
                                        />
                                    ))}
                                    <h1 className="-bottom-1 absolute -right-[32px]">{item.star}.0</h1>
                                </div>
                                <div>
                                    {/* detail komen */}
                                    <div className="flex gap-2 flex-col my-[24px]">
                                        <div className="flex gap-2">
                                            <img src={ruler} alt="ruler" />
                                            <h1 className="text-[#6C6B69]">Size: {item.detail.Size}</h1>
                                        </div>
                                        <div className="flex gap-2 ml-1 relative">
                                            {/* <img src={ruler} alt="ruler" /> */}
                                            <div className="w-[16px] h-[16px] rounded-full bg-black" />
                                            <h1 className="text-[#6C6B69] relative bottom-1">Color: {item.detail.Color}</h1>
                                        </div>
                                    </div>
                                    <div className="py-[16px] px-[20px] border border-[#dedede] rounded-[12px]">
                                        <p className="body-regular text-[#6C6B69]">{item.description}</p>
                                    </div>
                                </div>
                                {/* komen user profile */}
                                <div className="flex gap-[16px] text-[#6C6B69] mt-[24px] w-fit ml-auto items-center mb-[40px]">
                                    <p>{item.profileUser.name}</p>
                                    <div className="w-[6px] h-[6px] bg-[#dedede] rounded-full" />
                                    <p>{item.profileUser.gender}</p>
                                    <div className="w-[6px] h-[6px] bg-[#dedede] rounded-full" />
                                    <p>{item.profileUser.age}</p>
                                    <div className="w-[6px] h-[6px] bg-[#dedede] rounded-full" />
                                    <p>{item.profileUser.height}</p>
                                    <div className="w-[6px] h-[6px] bg-[#dedede] rounded-full" />
                                    <p>{item.profileUser.weight}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            </div>
            <section>
                <div className="">
                    <HorizontalScroll marginX="40px" productSettings={true} CustomBackgroundEvent="#BC5249" CustomEventName="Christmas Sale" eventState={true} title={"Similiar Products"} data={data.products} customStyle={{marginRight : "-40px", marginLeft : "-40px", paddingLeft : "40px"}} customStyle2={{justifyContent: "space-between", maxHeight: "500px", minHeight: "448px"}} imageHeight={"301px"} CustomTextStyle={{ width : "100%", textAlign : "center"}} />
                    <HorizontalScroll marginX="40px" productSettings={true} CustomBackgroundEvent="#BC5249" CustomEventName="Christmas Sale" eventState={true} title={"Style With"} data={data.products} customStyle={{marginRight : "-40px", marginLeft : "-40px", paddingLeft : "40px"}} customStyle2={{justifyContent: "space-between", maxHeight: "500px", minHeight: "448px"}} imageHeight={"301px"} CustomTextStyle={{ width : "100%", textAlign : "center"}} />
                    <HorizontalScroll marginX="40px" productSettings={true} CustomBackgroundEvent="#BC5249" CustomEventName="Christmas Sale" eventState={true} title={"Recently Viewed"} data={data.products} customStyle={{marginRight : "-40px", marginLeft : "-40px", paddingLeft : "40px"}} customStyle2={{justifyContent: "space-between", maxHeight: "500px", minHeight: "448px"}} imageHeight={"301px"} CustomTextStyle={{ width : "100%", textAlign : "center"}} />
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default ProductDetail;