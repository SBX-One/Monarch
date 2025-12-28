import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
  slug: string;
  image?: string;
};

type Product = {
  id: number;
  title?: string;
  slug?: string;
  images?: string[];
  thumbnail?: string;
};

type Location = {
  id: number;
  name?: string;
  address?: string;
  description?: string;
};

type Resource = "categories" | "products" | "locations";

export default function Testing() {
  const [resource, setResource] = useState<Resource>("products");
  const [items, setItems] = useState<Array<Category | Product | Location>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.escuelajs.co/api/v1/${resource}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("API response:", data);
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setItems([]);
        setLoading(false);
      });
  }, [resource]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <label style={{ display: "block", marginBottom: 12 }}>
        Pilih resource:
        <select
          value={resource}
          onChange={(e) => setResource(e.target.value as Resource)}
          style={{ marginLeft: 8 }}
        >
          <option value="categories">categories</option>
          <option value="products">products</option>
          <option value="locations">locations</option>
        </select>
      </label>

      {items.length === 0 && <p>No items</p>}

      {items.map((item: any) => {
        const imageSrc =
          item?.images?.[0] ?? item?.thumbnail ?? item?.image;

        const title =
          item?.name ??
          item?.title ??
          item?.slug ??
          item?.address ??
          `#${item.id}`;

        return (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              padding: 12,
              marginBottom: 12,
            }}
          >
            <h3 style={{ margin: 0 }}>{title}</h3>

            {item?.address && (
              <p style={{ margin: "4px 0" }}>{item.address}</p>
            )}

            {imageSrc ? (
              <img
                src={imageSrc}
                alt={title}
                style={{ maxWidth: 300, marginTop: 8 }}
                loading="lazy"
              />
            ) : (
              <p style={{ marginTop: 8 }}>No image</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
