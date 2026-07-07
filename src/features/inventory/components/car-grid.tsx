"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Car, CarCard } from "./car-card";

const INVENTORY: Car[] = [
  {
    id: 1,
    name: "Mercedes-Benz GLE",
    specs: "3.0L | Automatic | 15,000 km",
    price: "AED 139,900",
    image: "/inventory/benz.webp",
  },
  {
    id: 2,
    name: "Porsche 911 GT3 RS",
    specs: "4.0L | Automatic | 5,000 km",
    price: "AED 223,800",
    image: "/inventory/porsche.webp",
  },
  {
    id: 3,
    name: "BMW i4 M50",
    specs: "Electric | Automatic | 12,000 km",
    price: "AED 211,000",
    image: "/inventory/bmw.webp",
  },
  {
    id: 4,
    name: "Audi A7 Sportback",
    specs: "3.0L | Automatic | 20,000 km",
    price: "AED 147,100",
    image: "/catagory/suv.webp",
  },
  {
    id: 5,
    name: "Range Rover Sport",
    specs: "3.0L | Automatic | 22,000 km",
    price: "AED 320,000",
    image: "/catagory/suv.webp",
  },
  {
    id: 6,
    name: "Mercedes-Benz S-Class",
    specs: "4.0L V8 | Automatic | 8,000 km",
    price: "AED 450,000",
    image: "/catagory/sedan.webp",
  },
];

export function CarGrid() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInventory = INVENTORY.filter((car) =>
    car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.specs.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">Showing {filteredInventory.length} Vehicles</h2>
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
            <option>Mileage: Low to High</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {filteredInventory.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
        {filteredInventory.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No vehicles found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
