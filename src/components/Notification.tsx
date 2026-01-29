import x from "../assets/svg/x.svg"

type NotificationProps = {
    message: string;
    onClick?: () => void;
};

export default function Notification({ message, onClick }: NotificationProps) {
    return (
        <div className="absolute max-[480px]:top-53 top-45 z-10 w-full pl-[24px] max-[480px]:pr-[80px]  py-[20px] bg-[#F5F3F2] flex items-center justify-center">
            <h1 className="text-left lg:text-center text-[#0A0805] small max-[480px]:w-[376px] leading-[150%]  ">{message}</h1>
            <img src={x} alt="delete" className="absolute right-10" onClick={onClick} />
        </div>
    )
}