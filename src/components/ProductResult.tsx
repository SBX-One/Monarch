import { useNavigate } from "react-router-dom";

type ProductResultProps = {
    title : string;
    data : { id?: number; name?: string; image?: string, price?: number, eventType?: string }[];
    imageHeight?: React.CSSProperties["height"] | string;
    imageGap?: React.CSSProperties["gap"] | string;
    justify?: React.CSSProperties["justifyContent"] | string;
    textWidth?: React.CSSProperties["width"] | string;
    marginYText?: React.CSSProperties["marginTop"] | string;
    marginTopProduct?: string;
}

export default function ProductResult({title, data, imageHeight, imageGap, justify, textWidth, marginYText, marginTopProduct} : ProductResultProps) {
    const navigate = useNavigate();

    const resolveImage = (path : string) => {
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

    return (
        <div className="mx-10 flex">
            <h1>{title}</h1>
            <div className={`flex w-full gap-[${imageGap}] justify-${justify} mt-[${marginTopProduct}] `}>
                {data?.map((item, index) => (
                    <div 
                        key={index} 
                        className={`flex flex-col cursor-pointer`}
                        onClick={() => item.id && navigate(`/product/${item.id}`)}
                    >
                        <img src={resolveImage(item.image as string)} alt="product" className={`max-w-[${imageHeight}] h-[${imageHeight}]`} />
                        <h2 className={`w-[${textWidth}] mx-auto text-center body-regular my-[${marginYText}]`}>{item.name}</h2>
                        <p className="text-center large ">{formatPrice(item.price)},00 IDR</p>
                    </div>
                ))}
            </div>
        </div>
    )
}