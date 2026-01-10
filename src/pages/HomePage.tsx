import Header from "../components/Header"
import Notification from "../components/Notification"
import Banner_1 from "../assets/png/banner/Banner_1.png"

import Slider from "react-slick"
import type { Settings } from "react-slick"

import { useState, useRef } from "react"
import Data from "../data/Data_Dummy.json"

type CSSVars = React.CSSProperties & {
    "--dot-size": string;
    "--dot-color": string;
    "--dot-active-color": string;
};
const HomePages = () => {
    const [showNotification, setShowNotification] = useState(true);
    const sliderRef = useRef<Slider | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Customize these values to change dot size and colors and position
    const dotSize = 16; // px
    const dotColor = "#ffffff";
    const dotActiveColor = "#A30303";

    const slides = [Banner_1, Banner_1, Banner_1];

    const settings:Settings  = {
        dots: false, // disable built-in dots
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        beforeChange: (_current: number, next: number) => setActiveIndex(next),
    }

    const resolveImage = (path: string) => {
        try {
            return new URL(path, import.meta.url).href
        } catch (e) {
            return path
        }
    }

    const handleNotificationClose = () => {
        setShowNotification(false);
    };

    return (
        <div className="bg-[#fafafa]">
            <Header />
            {showNotification && <Notification message="Same Day Delivery (London Only) - Order before 12 pm for same day dekivery. Avaible across selected London postcodes. Select this service at checkout" onClick={handleNotificationClose} />}
            <div className="relative">
                <Slider ref={sliderRef} {...settings} className="">
                    {slides.map((src, i) => (
                        <div key={i}>
                            <img src={src} alt={`Banner ${i + 1}`} className="w-full h-auto" />
                        </div>
                    ))}
                </Slider>

                {/* Custom dots - can be freely positioned with CSS */}
                <div className="custom-dots-wrapper" style={{ ['--dot-size']: `${dotSize}px`, ['--dot-color']: dotColor, ['--dot-active-color']: dotActiveColor } as CSSVars}>
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`custom-dot ${i === activeIndex ? 'active' : ''}`}
                            onClick={() => sliderRef.current?.slickGoTo(i)}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
            <div className="mt-[80px] px-10">
                <h1 className="large">Highlights</h1>
                    <div className="mt-5 mb-5 overflow-x-auto -mx-10">
                        <div className="flex gap-6 items-center flex-nowrap pl-10">
                            {Data.categories.map((item, index) => (
                                <div key={index} className="flex-shrink-0 w-auto flex flex-col-reverse">
                                    <h2 className="mb-2">{item.name}</h2>
                                    <img src={resolveImage(item.image as string)} alt={item.name} className="h-[310px] object-contain body-regular" />
                                </div>
                            ))}
                        </div>
                    </div>
            </div>
        </div>
    )
}

export default HomePages