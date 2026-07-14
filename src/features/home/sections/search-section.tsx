"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

const POPULAR_BRANDS = [
  "Audi",
  "BMW",
  "Cadillac",
  "Chevrolet",
  "Ford",
  "Honda",
  "Jeep",
  "Lamborghini",
  "Maserati",
  "Mercedes-Benz",
  "Porsche",
  "Range Rover",
];

export function SearchSection() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [name, setName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = [brand, model, name].filter(Boolean).join(" ");
    if (query) {
      router.push(`/cars?q=${encodeURIComponent(query)}`);
    } else {
      router.push(`/cars`);
    }
  };

  const filteredBrands = POPULAR_BRANDS.filter(b => b.toLowerCase().includes(brand.toLowerCase()));

  return (
    <section className="py-12 bg-background relative z-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-heading font-normal text-white mb-8 text-center">
            Quick Search
          </h2>
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative" ref={dropdownRef}>
              <label htmlFor="brand" className="text-sm font-normal text-white/70 mb-1.5 block">Brand</label>
              <input
                id="brand"
                type="text"
                placeholder="e.g. BMW"
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                className="w-full bg-white/5 border border-white/10 text-white rounded-md px-4 py-3 outline-none focus:border-accent transition-colors"
                autoComplete="off"
              />
              {showDropdown && filteredBrands.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-[#18181b] border border-white/10 rounded-md shadow-xl max-h-60 overflow-y-auto hide-scrollbar">
                  {filteredBrands.map((b) => (
                    <div
                      key={b}
                      className="px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                      onClick={() => {
                        setBrand(b);
                        setShowDropdown(false);
                      }}
                    >
                      {b}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 relative">
              <label htmlFor="model" className="text-sm font-normal text-white/70 mb-1.5 block">Model</label>
              <input
                id="model"
                type="text"
                placeholder="e.g. M4"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white rounded-md px-4 py-3 outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="flex-1 relative">
              <label htmlFor="name" className="text-sm font-normal text-white/70 mb-1.5 block">Name / Keywords</label>
              <input
                id="name"
                type="text"
                placeholder="e.g. 2024 Black"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 text-white rounded-md px-4 py-3 outline-none focus:border-accent transition-colors"
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full md:w-auto bg-accent hover:bg-accent/90 text-black font-normal px-8 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 h-[50px]"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
