import { useState } from "react";
import arrow_down from "../assets/svg/chevron-down.svg";

type FilterDropdownProps<T extends string> = {
  label: string;
  options: T[];
  value: T | null;
  onSelect: (value: T | null) => void;
};

export default function FilterDropdown<T extends string>({
  label,
  options,
  value,
  onSelect,
}: FilterDropdownProps<T>) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(prev => !prev)}
        className={`flex gap-[8px] h-[44px] px-[16px] items-center rounded-full border
          ${value ? "border-black font-medium" : "border-[#dedede]"}
        `}
      >
        <span>{value ?? label}</span>
        <img
          src={arrow_down}
          alt="arrow"
          className={`h-[20px] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 mt-2 min-w-full bg-white border rounded-xl shadow-md">
          {options.map(option => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
              {option}
            </button>
          ))}

          {value && (
            <button
              type="button"
              onClick={() => {
                onSelect(null);
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-red-500 hover:bg-gray-100"
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  );
}
