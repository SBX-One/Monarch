import { useRef } from "react";
import Data from "../data/Data_Dummy.json";
import arrow from "../assets/svg/arrow.svg";

type HorizontalScrollProps = {
    title: string;
    data: typeof Data;
    customStyle?: React.CSSProperties | null;
    customStyle2?: React.CSSProperties;
}

export default function HorizontalScroll({ title, data, customStyle, customStyle2 }: HorizontalScrollProps) {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;

        scrollRef.current.scrollBy({
            left: dir === "left" ? -300 : 300,
            behavior: "smooth",
        });
        console.log("scrolling", dir);
    }

    const resolveImage = (path: string) => {
        try {
            return new URL(path, import.meta.url).href
        } catch (e: unknown) {
            return path
        }
    }


    return (
        <div className="mt-[80px] px-10">
                <div className="flex justify-between">
                    <h1 className="large">{title}</h1>
                    <div className="flex flex-row gap-[16px]">
                        <img src={arrow} alt="arrow" className="h-[24px]" onClick={() => scroll("left")} />
                        <img src={arrow} alt="arrow" className="rotate-180 h-[24px]" onClick={() => scroll("right")} />
                    </div>
                </div>
                    <div ref={scrollRef} className="mt-5 mb-5 overflow-x-hidden " style={customStyle || {}}>
                        <div className="flex items-center flex-nowrap" style={customStyle2 || {}}>
                            {data.map((item, index) => (
                                <div key={item.id | index} className="flex-shrink-0 w-auto flex flex-col-reverse">
                                    <h2 className="mb-2">{item.name}</h2>
                                    <img src={resolveImage(item.image as string)} alt={item.name} className="object-contain body-regular" />
                                </div>
                            ))}
                        </div>
                    </div>
            </div>
    )
}