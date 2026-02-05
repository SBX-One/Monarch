import { useNavigate } from "react-router-dom";

type ProductResultProps = {
    title : string;
    data : { id?: number; name?: string; image?: string, price?: number, eventType?: string }[];
    imageHeight?: React.CSSProperties["height"] | string;
    imageWidth?: React.CSSProperties["width"] | string;
    imageGap?: React.CSSProperties["gap"] | string;
    justify?: React.CSSProperties["justifyContent"] | string;
    textWidth?: React.CSSProperties["width"] | string;
    marginYText?: React.CSSProperties["marginTop"] | string;
    marginTopProduct?: string;
}

export default function ProductResult({title, data, imageHeight, imageWidth, imageGap, justify, textWidth, marginYText, marginTopProduct} : ProductResultProps) {
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
        <div className="mx-6 min-[480px]:mx-10 flex flex-col" style={{ marginTop: marginTopProduct }}>
            {title && <h1 className="header-3-bold mb-4">{title}</h1>}
            <div 
                className={`flex flex-wrap w-full`} 
                style={{ 
                    gap: imageGap || '24px', 
                    justifyContent: justify || 'flex-start' 
                }}
            >
                {data?.map((item, index) => (
                    <div 
                        key={index} 
                        className="flex flex-col cursor-pointer w-full"
                        onClick={() => item.id && navigate(`/product/${item.id}`)}
                        style={{ maxWidth: imageWidth || textWidth || '196px' }}
                    >
                        <div className="relative w-full overflow-hidden">
                            <img 
                                src={resolveImage(item.image as string)} 
                                alt="product" 
                                className="w-full object-cover"
                                style={{ 
                                    height: imageHeight || '250px' 
                                }}
                            />
                        </div>
                        <h2 
                            className="text-center body-regular truncate px-1" 
                            style={{ marginTop: marginYText || '8px' }}
                            title={item.name}
                        >
                            {item.name}
                        </h2>
                        <p className="text-center large font-bold">{formatPrice(item.price)},00 IDR</p>
                    </div>
                ))}
            </div>
        </div>
    )
}