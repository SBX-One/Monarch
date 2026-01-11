import Header from "../components/Header"
import Notification from "../components/Notification"
import Banner_1 from "../assets/png/banner/Banner_1.png"
import backgroundBanner from "../assets/png/banner/BackgroundBanner.png"
import arrow from "../assets/svg/arrow.svg"

import Slider from "react-slick"
import type { Settings } from "react-slick"
import HorizontalScroll from "../components/HorizontalScroll"

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
            <HorizontalScroll title={"Highlights"} data={Data.categories} customStyle={{marginRight : "-40px", marginLeft : "-40px", paddingLeft : "40px"}} customStyle2={{gap : "8px"}}  />
            <div
                className="w-full h-[496px] flex items-center pl-[98px] my-[80px]"
                style={{
                    backgroundImage: `url(${backgroundBanner})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="flex flex-col gap-[24px]">
                    <h1 className="header-1-bold text-[#A30303]">CHRISTMAS ESSENCIAL</h1>
                    <div className="flex flex-row gap-[16px]">
                        <div className="flex flex-row gap-[8px]">
                            <h1 className="label pb-3">Women</h1>
                            <img src={arrow} className="rotate-180" alt="arrow" />
                        </div>
                        <div className="flex flex-row gap-[8px]">
                            <h1 className="label pb-3">Men</h1>
                            <img src={arrow} className="rotate-180" alt="arrow" />
                        </div>
                    </div>
                </div>
            </div>

            <section>
                <HorizontalScroll title={"Our Latest Collections"} data={Data.LatestCollections} customStyle2={{justifyContent: "space-between", maxHeight: "500px", minHeight: "448px"}} />
            </section>
        </div>
    )
}

export default HomePages