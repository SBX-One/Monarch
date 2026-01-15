import { useParams } from "react-router-dom"
import data from "../data/Data_Dummy.json"


export default function SearchResult() {
    const { query } = useParams();
    const decodedQuery = query?.replace(/\+/g, " ").toLowerCase().trim();
    const filteredProducts = data.ProductsResult.filter((item) => item.name.toLowerCase().includes(decodedQuery || ""));

    const resolveImage = (path: string) => {
        try {
            return new URL(path, import.meta.url).href
        } catch {
            return path
        }
    }

    return (
        <div>
            <div className="px-10 py-10">
            <h1 className="text-2xl font-bold mb-6">
                Search result for "{decodedQuery}"
            </h1>

            {filteredProducts.length === 0 ? (
                <p>No product found 😔</p>
            ) : (
                <div className="grid grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div
                    key={product.id}
                    className="border rounded-xl p-4 hover:shadow-md transition"
                    >
                    <img
                        src={resolveImage(product.image)}
                        alt={product.name}
                        className="mb-3"
                    />
                    <h2 className="font-medium">{product.name}</h2>
                    <p className="text-sm text-gray-500 capitalize">
                        {product.category.trim()}
                    </p>
                    <p className="mt-1 font-semibold">
                        Rp {product.price.toLocaleString("id-ID")}
                    </p>
                    <span className="text-xs text-green-600">
                        {product.eventType}
                    </span>
                    </div>
                ))}
                </div>
            )}
            </div>
        </div>
    )
}