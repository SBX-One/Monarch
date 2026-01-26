import x from "../assets/svg/x.svg"

type NotificationProps = {
    message: string;
    onClick?: () => void;
};

export default function Notification({ message, onClick }: NotificationProps) {
    return (
        <div className="absolute top-45 z-10 w-full pl-[24px] lg:pl-0 xl:pl-0 pr-[80px] xl:pr-0 h-[66px] bg-[#F5F3F2] flex items-center justify-center">
            <h1 className="text-left lg:text-center text-[#0A0805] small">{message}</h1>
            <img src={x} alt="delete" className="absolute right-10" onClick={onClick} />
        </div>
    )
}