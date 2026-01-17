export type Gender = "Women" | "Men" | "Unisex";
export type Offer = "Christmas Sale" | "New Arrival" | "none";
export type Size = "S" | "M" | "L" | "XL" | "XXL";
export type Color = "Bright" | "Dark";

export type FilterConfig =
  | {
      key: "gender";
      label: string;
      options: readonly Gender[];
    }
  | {
      key: "offer";
      label: string;
      options: readonly Offer[];
    }
  | {
      key: "size";
      label: string;
      options: readonly Size[];
    }
  | {
      key: "color";
      label: string;
      options: readonly Color[];
    };

const FILTER_CONFIG: readonly FilterConfig[] = [
  {
    key: "gender",
    label: "Gender",
    options: ["Women", "Men", "Unisex"],
  },
  {
    key: "offer",
    label: "Offer",
    options: ["Christmas Sale", "New Arrival", "none"],
  },
  {
    key: "size",
    label: "Size",
    options: ["S", "M", "L", "XL", "XXL"],
  },
  {
    key: "color",
    label: "Color",
    options: ["Bright", "Dark"],
  },
];

export default FILTER_CONFIG;
