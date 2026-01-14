import { useParams, useSearchParams } from "react-router-dom";

const SearchResult = () => {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("q" || "")

    const filteredProduct = products

    return (
        <div>

        </div>
    )
}

export default SearchResult;