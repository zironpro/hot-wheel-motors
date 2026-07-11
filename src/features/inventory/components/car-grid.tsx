"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Car, CarCard } from "./car-card";

interface Filters {
  makes: string[];
  priceRanges: string[];
  bodyTypes: string[];
}

interface CarGridProps {
  cars: Car[];
  filters: Filters;
}

export function CarGrid({ cars, filters }: CarGridProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const suvKeywords = ["x5", "x7", "q8", "escalade", "suburban", "silverado", "f-150", "f250", "cr-v", "wrangler", "cherokee", "urus", "gle", "gls", "g550", "g63", "g580", "levante", "cayenne", "range rover", "durango", "expedition"];
  const sportsKeywords = ["m8", "camaro", "corvette", "aventador", "targa", "carrera", "rs3", "m4", "m3"];
  
  const getBodyType = (carName: string) => {
    const n = carName.toLowerCase();
    if (suvKeywords.some(k => n.includes(k))) return "suv";
    if (sportsKeywords.some(k => n.includes(k))) return "sports";
    return "sedan"; // Default fallback
  };

  const getPriceRange = (priceStr: string) => {
    if (priceStr.toLowerCase().includes("request") || priceStr === "N/A" || !priceStr.includes("AED")) return "on-request";
    const price = parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
    if (isNaN(price)) return "on-request";
    if (price < 150000) return "under-150k";
    if (price < 300000) return "150k-300k";
    if (price < 500000) return "300k-500k";
    return "over-500k";
  };

  const filteredInventory = cars.filter((car) => {
    // Search filter
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) || car.specs.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Make filter
    const matchesMake = filters.makes.length === 0 || filters.makes.some(m => car.name.toLowerCase().includes(m));
    
    // Price filter
    const carPriceRange = getPriceRange(car.price || "");
    const matchesPrice = filters.priceRanges.length === 0 || filters.priceRanges.includes(carPriceRange);
    
    // Body filter
    const carBodyType = getBodyType(car.name);
    const matchesBody = filters.bodyTypes.length === 0 || filters.bodyTypes.includes(carBodyType);

    return matchesSearch && matchesMake && matchesPrice && matchesBody;
  });

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-normal text-white">Showing {filteredInventory.length} Vehicles</h2>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search vehicles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#09090b] border border-white/10 text-white text-sm rounded-md pl-9 pr-3 py-2 outline-none focus:border-accent transition-colors placeholder:text-muted-foreground"
            />
          </div>
          <select className="bg-[#09090b] border border-white/10 text-white text-sm rounded-md px-3 py-2 outline-none focus:border-accent transition-colors shrink-0">
            <option>Sort by: Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {filteredInventory.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
        {filteredInventory.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No vehicles found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}
