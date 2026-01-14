import arrow from "../assets/svg/arrow.svg";

export default function Footer() {
    return (
        <div className="bg-[#3C3C43] w-full h-[720px] px-[80px] pt-[65px]">
            <div className="flex justify-between">
                <div id="Shopping_Footer" className="text-white w-[209px] gap-[16px] flex flex-col">
                    <h1 className="satoshi font-bold text-[18px]">Shopping With Us</h1>
                    <div className=" font-light gap-[16px] flex flex-col">
                        <p>Size Chart</p>
                        <p>Interior Advisor Service</p>
                        <p>Refer A Friend</p>
                    </div>
                </div>
                <div id="CS_Footer" className="text-white w-[209px] gap-[16px] flex flex-col">
                    <h1 className="satoshi font-bold text-[18px]">Customer Service</h1>
                    <div className=" font-light gap-[16px] flex flex-col">
                        <p>Delivery</p>
                        <p>Returns & Refunds</p>
                        <p>FAQs</p>
                        <p>Contact Us</p>
                        <p>Gift Cards</p>
                        <p>Press Contact</p>
                    </div>
                </div>
                <div id="AboutUs_Footer" className="text-white w-[209px] gap-[16px] flex flex-col">
                    <h1 className="satoshi font-bold text-[18px]">About Us</h1>
                    <div className=" font-light gap-[16px] flex flex-col">
                        <p>About Monarch</p>
                        <p>Monarch Materials</p>
                        <p>Data Access Request</p>
                        <p>Privacy Policy</p>
                        <p>Terms & Conditions</p>
                        <p>Modern Slavery Statement</p>
                        <p>Tax Strategy</p>
                        <p>Affiliates</p>
                    </div>
                </div>
                <div className="flex flex-col gap-10">
                    <div id="Sustain_Footer" className="text-white gap-[16px] flex flex-col w-[209px]">
                        <h1 className="satoshi font-bold text-[18px]">Sustainability</h1>
                        <p className="font-light">Out Philosophy Is Based On The Japannese Animation Of Form, Function And Unique</p>
                    </div>
                    <div id="SocialMedia_Footer" className="text-white gap-[16px] flex flex-col">
                        <h1 className="satoshi font-bold text-[18px] w-[148px]">Find Us On Social Media</h1>
                        <p className="font-light">Instagram</p>
                    </div>
                </div>
                <div>
                    <div id="MemberShip_Footer" className="text-white w-[209px] gap-[16px] flex flex-col">
                        <h1 className="satoshi font-bold text-[18px]">Monarch Membership</h1>
                        <p className="font-light">Become A Monarch And Reveice An Online Voucher</p>
                    </div>
                    <div className="flex mt-[24px]">
                        <input type="Email" className="w-[208px] h-[44px] bg-white rounded-full py-[8px] px-[14px]" placeholder="Enter your email" />
                        <div className="bg-black h-[44px] w-[44px] flex justify-center items-center rounded-full p-[10px] rotate-180">
                            <img src={arrow} alt="arrow" className="filter invert" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}