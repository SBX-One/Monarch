import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../assets/svg/arrow.svg";
import setting from "../assets/svg/settings.svg"
import dummyData from "../data/Data_Dummy.json";

type HorizontalScrollProps = {
    title: string;
    data: { id?: number; name?: string; image?: string, price?: number, eventType?: string }[];
    customStyle?: React.CSSProperties | null;
    customStyle2?: React.CSSProperties;
    imageHeight?: React.CSSProperties["height"] | string;
    CustomTextStyle?: React.CSSProperties;
    eventState?: boolean;
    CustomEventName?: string;
    CustomBackgroundEvent?: React.CSSProperties["backgroundColor"] | string;
    productSettings?: boolean;
    scrollToggle?: boolean;
    marginTop?: React.CSSProperties["marginTop"] | string;
    marginX?: string;
}

export default function HorizontalScroll({ marginTop, marginX, title, data, customStyle, customStyle2, imageHeight, CustomTextStyle, eventState, CustomEventName, CustomBackgroundEvent, productSettings, scrollToggle = true }: HorizontalScrollProps) {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [colorSetting, setColorSetting] = useState<number | null>(null);
    const navigate = useNavigate();

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;

        scrollRef.current.scrollBy({
            left: dir === "left" ? -300 : 300,
            behavior: "smooth",
        });
        // console.log("scrolling", dir);
    }

    const resolveImage = (path: string) => {
        try {
            return new URL(path, import.meta.url).href
        } catch {
            return path
        }
    }

    const formatPrice = (value?: number) => {
        if (value == null) return '';
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value);
    }

    function handleColorSetting(index: number) {
        setColorSetting(prev => (prev === index ? null : index));
        console.log("clicked setting", index);
    }

    function handleProductClick(productId?: number) {
        if (productId) {
            navigate(`/product/${productId}`);
        }
    }

    return (
        <div className={`px-[${marginX}]`} style={{ marginTop }}>
            <div className="flex justify-between">
                <h1 className="large">{title}</h1>
                {scrollToggle && (
                    <div className="flex flex-row gap-[16px]">
                        <img src={arrow} alt="arrow" className="h-[24px]" onClick={() => scroll("left")} />
                        <img src={arrow} alt="arrow" className="rotate-180 h-[24px]" onClick={() => scroll("right")} />
                    </div>
                )}
            </div>
            <div ref={scrollRef} className="mt-[24px] mb-5 overflow-x-hidden " style={customStyle || {}}>
                <div className="flex items-center flex-nowrap " style={customStyle2 || {}}>
                    {data?.map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 flex flex-col-reverse cursor-pointer"
                            style={{ minWidth: 240, marginRight: 8 }}
                            onClick={() => handleProductClick(item.id)}
                        >
                            {item.price !== undefined && <h2 className="mb-2 large" style={CustomTextStyle}>{formatPrice(item.price)}.00 IDR</h2>}
                            <h2 className="mb-2 body-regular w-[70%]" style={CustomTextStyle}>{item.name}</h2>
                            {/* <h2 className="mb-2 mx-auto" style={CustomTextStyle}>{item.price}</h2> */}
                            <div
                                style={{
                                    height: imageHeight,
                                    width: imageHeight,
                                    backgroundImage: `url(${resolveImage(item.image as string || '')})`,
                                }}
                                className="overflow-hidden bg-cover bg-center bg-no-repeat"
                            >
                                <div className="flex justify-between relative">
                                    {eventState && item.eventType === "New Arrival" && (
                                        <div className="m-[16px] bg-white px-[16px] py-[8px] w-fit rounded-full">
                                            <p className="subtle">NEW ARRIVAL</p>
                                        </div>
                                    )}
                                    {eventState && item.eventType === "Sold Out" && (
                                        <div className="m-[16px] bg-[#A30303] px-[16px] py-[8px] w-fit rounded-full">
                                            <p className="subtle text-white">SOLD OUT</p>
                                        </div>
                                    )}
                                    {eventState && item.eventType === "Custom Event" && (
                                        <div className="m-[16px] px-[16px] py-[8px] w-fit rounded-full" style={{ backgroundColor: CustomBackgroundEvent }}>
                                            <p className="subtle text-white">{CustomEventName}</p>
                                        </div>
                                    )}

                                    {productSettings && (
                                        <div className="p-[16px] right-0 absolute">
                                            <img className="w-[24px] " src={setting} alt="settings" onClick={() => handleColorSetting(index)} />
                                            {colorSetting === index && (
                                                <div className="absolute right-4">
                                                    {dummyData.colorSetting?.map((item, i) => (
                                                        <div className="" key={i}>
                                                            <img className="w-[24px] my-[8px]" src={resolveImage(item.image as string || '')} alt={item.name} />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}