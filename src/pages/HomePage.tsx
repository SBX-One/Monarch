import Header from "../components/Header"
import Notification from "../components/Notification"
import Banner_1 from "../assets/png/banner/Banner_1.png"
import backgroundBanner from "../assets/png/banner/BackgroundBanner.png"
import arrow from "../assets/svg/arrow.svg"
import data from "../data/Data_Dummy.json";
import Footer from "../components/Footer"

import Slider from "react-slick"
import type { Settings } from "react-slick"
import HorizontalScroll from "../components/HorizontalScroll"
import { useNavigate } from "react-router-dom"

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
    const [searchInput, setSearchInput] = useState("");
    const navigate = useNavigate();

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

    const resolveImage = (path: string) => {
        try {
            return new URL(path, import.meta.url).href
        } catch {
            return path
        }
    }

    function handleSubmitSearch() {
        const trimmed = searchInput.trim();

        if (trimmed) {
        navigate(`/search-result/${trimmed.replace(/\s+/g, "+")}`);
        } else {
        navigate("/search-result");
        }
  }

    return (
        <div className="bg-[#fafafa] ">
            <Header searchValue={searchInput} onSearchChange={setSearchInput} onSubmitSearch={handleSubmitSearch} />
            {showNotification && <Notification message="Same Day Delivery (London Only) - Order before 12 pm for same day dekivery. Avaible across selected London postcodes. Select this service at checkout" onClick={handleNotificationClose} />}
            <div className="relative">
                <Slider ref={sliderRef} {...settings} className="">
                    {slides.map((src, i) => (
                        <div key={i}>
                            <img src={src} alt={`Banner ${i + 1}`} className="w-full h-auto max-[480px]:h-[460px] object-cover" />
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
            <HorizontalScroll marginTop={"mt-[80px] max-[480px]:mt-[40px]"} marginX={"40px"} title={"Highlights"} data={Data.categories} customStyle={{marginRight : "-40px", marginLeft : "-40px", paddingLeft : "40px"}} customStyle2={{gap : "8px"}} imageHeight={"310px"} />
            <div
                className="w-full h-[496px] min-[480px]:pl-[98px] flex items-center max-[480px]:justify-center my-[80px]"
                style={{
                    backgroundImage: `url(${backgroundBanner})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat',
                }}
            >
                <div className="flex flex-col gap-[24px] max-[480px]:items-center">
                    <h1 className="header-1-bold text-[#A30303] max-[480px]:text-center">CHRISTMAS ESSENCIAL</h1>
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
                <HorizontalScroll gap={"max-[480px]:8px min-[481px]:8px"} marginTop={"max-[480px]:40px min-[481px]:80px"} marginX={"40px"} title={"Our Latest Collections"} data={Data.LatestCollections} customStyle2={{justifyContent: "min-[481px]:space-between max-[480px]:flex-start", maxHeight: "500px", minHeight: "max-[480px]:224px min-[481px]:448px", gap: "max-[480px]:0px min-[481px]:8px"}} imageHeight={"max-[480px]:224px min-[481px]:448px"} customStyle={{marginRight : "-40px", marginLeft : "-40px", paddingLeft : "40px"}}/>
            </section>

            <section>
                <HorizontalScroll gap={"max-[480px]:8px min-[481px]:8px"} marginTop={"max-[480px]:40px min-[481px]:80px"} marginX={"40px"} productSettings={true} CustomBackgroundEvent="#BC5249" CustomEventName="Christmas Sale" eventState={true} title={"Recomended For You"} data={Data.products} customStyle={{justifyContent: "min-[481px]:space-between max-[480px]:flex-start",marginRight : "-40px", marginLeft : "-40px", paddingLeft : "40px"}} customStyle2={{justifyContent: "min-[481px]:space-between max-[480px]:flex-start", maxHeight: "auto", minHeight: "max-[480px]:224px min-[481px]:448px"}} imageHeight={"max-[480px]:224px min-[481px]:448px"} CustomTextStyle={{ width: "max-[480px]:192px min-[481px]:250px", textAlign: "center", marginLeft: "auto", marginRight: "auto", marginTop: "16px"}} />
            </section>

            <section className="mx-10 mt-[80px]">
                <div className="mb-[48px]">
                    <h1 className="large">Explore Best Seller</h1>
                    <p className="body-regular w-111 font-light">Lorem ipsum dolor sit amet consectetur. Leo congue lorem leo quis a interdum. Pharetra auctor ut semper hendrerit eu.</p>
                </div>
                <div className="flex flex-row w-auto gap-[8px] justify-between -mr-20" >
                    {data.BestSeller.map((item, index) => (
                        <div key={index}>
                            <div className="flex max-[480px]:gap-[8px]">
                                <div className={index == 2 ? "max-[480px]:hidden" : "flex justify-between flex-col -mr-10"}>
                                <img src={resolveImage(item.image)} alt={item.name} className={index == 2 ? "h-[537px] max-[480px]:h-[224px]" : "h-[403px] max-[480px]:h-[224px] max-[480px]:w-[224px]"} />
                                <div className={index == 2 ? "hidden" : "text-center max-[480px]:w-[224px]"}>
                                        <h3 className="body-regular my-[16px]">
                                            {item.name}
                                        </h3>
                                        <p className="large">
                                            Rp{item.price}.00 IDR
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <HorizontalScroll gap={"8px"} marginTop={"max-[480px]:40px min-[481px]:40px"} marginX={"max-[480px]:40px min-[481px]:40px"} title={"Explore More"} data={Data["Explore More"]} customStyle={{marginRight : "-40px", marginLeft : "-40px", paddingLeft : "40px"}} customStyle2={{justifyContent: "space-between", maxHeight: "500px", minHeight: "310px"}} imageHeight={"max-[480px]:224px min-[481px]:310px"} />
            </section>
            <section>
                <div className="mx-10">
                    <h2 className="large">
                        Moncarch Stories
                    </h2>
                    <p className="body-regular w-111 font-light">
                        Lorem ipsum dolor sit amet consectetur. Leo congue lorem leo quis a interdum. Pharetra auctor ut semper hendrerit eu.
                    </p>
                    <div>
                        {data.MonarchStories.map((item, index) => (
                            <div key={index} className="my-[40px] w-full">
                                <div className="flex flex-row py-[32px] justify-between">
                                    <div className="w-[300px] flex flex-row gap-[48px]">
                                        <p className="google-sans-regular font-thin">{item.id}</p>
                                        <h1 className="large w-[300px]">{item.Title}</h1>
                                    </div>
                                    <p className="font-bold satoshi">-</p>
                                    <p className="w-[712px] body-regular">Designing inviting and functional spaces for hotels , restaurant, and entertainment venues that enhance guest experiences and operational efficiency.</p>
                                    <button className="label w-[140px] p-[16px] border-1 border-[#dedede] rounded-full">Read This Post</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section >
                <Footer />
            </section>
        </div>
    )
}

export default HomePages