import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../assets/svg/arrow.svg";
import setting from "../assets/svg/settings.svg"
import dummyData from "../data/Data_Dummy.json";

type HorizontalScrollProps = {
    title: string;
    data: { id?: number; name?: string; image?: string, price?: number, eventType?: string }[];
    customStyle?: React.CSSProperties | string | null;
    customStyle2?: React.CSSProperties | string | null;
    imageHeight?: React.CSSProperties["height"] | string;
    CustomTextStyle?: React.CSSProperties | string;
    eventState?: boolean | string;
    CustomEventName?: string;
    CustomBackgroundEvent?: React.CSSProperties["backgroundColor"] | string;
    productSettings?: boolean | string;
    scrollToggle?: boolean | string;
    marginTop?: React.CSSProperties["marginTop"] | string;
    marginX?: string;
    gap?: string | number;
}

export default function HorizontalScroll({ marginTop, marginX, gap = 8, title, data, customStyle, customStyle2, imageHeight, CustomTextStyle, eventState, CustomEventName, CustomBackgroundEvent, productSettings, scrollToggle = true }: HorizontalScrollProps) {
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

    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getResponsiveValue = (val: any, fallback: any) => {
        if (typeof val !== 'string' || (!val.includes(':') && !val.includes('px') && !val.includes('%') && !val.includes('vh') && !val.includes('vw'))) {
            return val || fallback;
        }

        const parts = val.split(' ');
        let bestMatch = fallback;
        let highestPriority = -1;

        for (const part of parts) {
            if (part.includes(':')) {
                const [condition, value] = part.split(':');
                const cleanValue = value.replace(/[\[\]]/g, '');
                
                // Handle min-width
                const minMatch = condition.match(/min-\[(\d+)px\]/);
                if (minMatch && windowWidth >= parseInt(minMatch[1])) {
                    const priority = parseInt(minMatch[1]);
                    if (priority > highestPriority) {
                        highestPriority = priority;
                        bestMatch = cleanValue;
                    }
                }

                // Handle max-width
                const maxMatch = condition.match(/max-\[(\d+)px\]/);
                if (maxMatch && windowWidth <= parseInt(maxMatch[1])) {
                    // Max-width usually has lower priority than min-width in this logic, 
                    // but we'll use it if no min-width matched yet
                    if (highestPriority === -1) {
                        bestMatch = cleanValue;
                    }
                }
                
                // Handle standard tailwind breakpoints if needed (optional)
                const stdBreakpoints: Record<string, number> = { sm: 640, md: 768, lg: 1024, xl: 1280 };
                if (stdBreakpoints[condition] && windowWidth >= stdBreakpoints[condition]) {
                    if (stdBreakpoints[condition] > highestPriority) {
                        highestPriority = stdBreakpoints[condition];
                        bestMatch = cleanValue;
                    }
                }
            } else {
                // Default value (no breakpoint)
                if (highestPriority === -1) {
                    bestMatch = part.replace(/[\[\]]/g, '');
                }
            }
        }

        return bestMatch;
    };

    const isScaleClass = (val: any) => {
        if (typeof val !== 'string') return false;
        const parts = val.split(' ');
        return parts.some(part => {
            const actualValue = part.includes(':') ? part.split(':')[1] : part;
            return actualValue.startsWith('h-') || actualValue.startsWith('w-') || actualValue.startsWith('mt-') || actualValue.startsWith('px-');
        });
    };

    const currentImageHeight = getResponsiveValue(imageHeight, '310px');
    const currentMt = getResponsiveValue(marginTop, '0px');
    const currentMx = getResponsiveValue(marginX, '0px');
    const currentGap = getResponsiveValue(gap, 8);

    const style2Data = typeof customStyle2 === 'object' && customStyle2 !== null ? {
        ...customStyle2,
        minHeight: getResponsiveValue((customStyle2 as any).minHeight, (customStyle2 as any).minHeight),
        justifyContent: getResponsiveValue((customStyle2 as any).justifyContent, (customStyle2 as any).justifyContent),
        gap: currentGap === "0px" ? 0 : currentGap,
        display: 'flex',
    } : { gap: currentGap === "0px" ? 0 : currentGap, display: 'flex' };

    const textStyleData = typeof CustomTextStyle === 'object' && CustomTextStyle !== null ? {
        ...CustomTextStyle,
        width: getResponsiveValue((CustomTextStyle as any).width, (CustomTextStyle as any).width)
    } : CustomTextStyle;

    const isBgEventClass = typeof CustomBackgroundEvent === "string";

    return (
        <div 
            className={`${isScaleClass(marginX) ? marginX : ""} ${isScaleClass(marginTop) ? marginTop : ""}`} 
            style={{ 
                marginTop: !isScaleClass(marginTop) ? (currentMt as any) : undefined,
                paddingLeft: !isScaleClass(marginX) ? (currentMx as any) : undefined,
                paddingRight: !isScaleClass(marginX) ? (currentMx as any) : undefined
            }}
        >
            <div className="flex justify-between">
                <h1 className="large">{title}</h1>
                {scrollToggle && (
                    <div className={`flex flex-row gap-[16px] ${typeof scrollToggle === 'string' ? scrollToggle : ''}`}>
                        <img src={arrow} alt="arrow" className="h-[24px]" onClick={() => scroll("left")} />
                        <img src={arrow} alt="arrow" className="rotate-180 h-[24px]" onClick={() => scroll("right")} />
                    </div>
                )}
            </div>
            <div 
                ref={scrollRef} 
                className={`mt-[24px] mb-5 overflow-x-hidden ${typeof customStyle === 'string' ? customStyle : ""}`} 
                style={typeof customStyle === 'object' ? (customStyle as React.CSSProperties) || {} : {}}
            >
                <div 
                    className={`flex items-center flex-nowrap ${typeof customStyle2 === 'string' ? customStyle2 : ""}`} 
                    style={typeof style2Data === 'object' ? (style2Data as React.CSSProperties) || {} : {}}
                >
                    {data?.map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 flex flex-col-reverse cursor-pointer"
                            style={{ 
                                minWidth: !isScaleClass(imageHeight) ? (currentImageHeight as any) : 240,
                                width: !isScaleClass(imageHeight) ? (currentImageHeight as any) : 240,
                                margin: 0,
                                padding: 0,
                                boxSizing: 'border-box'
                            }}
                            onClick={() => handleProductClick(item.id)}
                        >
                            {item.price !== undefined && (
                                <h2 
                                    className={`mb-2 large ${typeof CustomTextStyle === 'string' ? CustomTextStyle : ""}`} 
                                    style={typeof textStyleData === 'object' ? (textStyleData as React.CSSProperties) : {}}
                                >
                                    {formatPrice(item.price)}.00 IDR
                                </h2>
                            )}
                            {item.name && (
                                <h2 
                                    className={`mb-2 body-regular w-[70%] ${typeof CustomTextStyle === 'string' ? CustomTextStyle : ""}`} 
                                    style={typeof textStyleData === 'object' ? (textStyleData as React.CSSProperties) : {}}
                                >
                                    {item.name}
                                </h2>
                            )}
                            <div
                                style={{
                                    height: !isScaleClass(imageHeight) ? (currentImageHeight as any) : undefined,
                                    width: !isScaleClass(imageHeight) ? (currentImageHeight as any) : undefined,
                                    backgroundImage: `url(${resolveImage(item.image as string || '')})`,
                                }}
                                className={`overflow-hidden bg-cover bg-center bg-no-repeat ${isScaleClass(imageHeight) ? (imageHeight as string) : ""}`}
                            >
                                <div className="flex justify-between relative">
                                    {eventState && item.eventType === "New Arrival" && (
                                        <div className={`m-[16px] bg-white px-[16px] py-[8px] w-fit rounded-full ${typeof eventState === 'string' ? eventState : ''}`}>
                                            <p className="subtle">NEW ARRIVAL</p>
                                        </div>
                                    )}
                                    {eventState && item.eventType === "Sold Out" && (
                                        <div className={`m-[16px] bg-[#A30303] px-[16px] py-[8px] w-fit rounded-full ${typeof eventState === 'string' ? eventState : ''}`}>
                                            <p className="subtle text-white">SOLD OUT</p>
                                        </div>
                                    )}
                                    {eventState && item.eventType === "Custom Event" && (
                                        <div 
                                            className={`m-[16px] px-[16px] py-[8px] w-fit rounded-full ${typeof eventState === 'string' ? eventState : ""} ${isBgEventClass ? CustomBackgroundEvent : ""}`} 
                                            style={!isBgEventClass ? { backgroundColor: CustomBackgroundEvent } : {}}
                                        >
                                            <p className="subtle text-white">{CustomEventName}</p>
                                        </div>
                                    )}

                                    {productSettings && (
                                        <div className={`p-[16px] right-0 absolute ${typeof productSettings === 'string' ? productSettings : ''}`}>
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