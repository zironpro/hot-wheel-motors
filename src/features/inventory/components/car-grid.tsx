"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Car, CarCard } from "./car-card";

const INVENTORY: Car[] = [
  {
    id: 1,
    slug: "audi-rs6",
    name: "Audi RS6",
    subtitle: "2024 MODEL",
    specs: "Gray | 3.6 S | Automatic",
    description: "The Audi RS6 Avant perfectly combines extreme performance with everyday practicality and stunning design.",
    price: "AED 450,000",
    image: "/slug/audi-rs6/audi-rs6-front-view.png", // using the new real image
  },
  {
    id: 2,
    slug: "bmw-m4",
    name: "BMW M4",
    subtitle: "2022 MODEL",
    specs: "Blue | 3.4 S | Automatic",
    description: "The BMW M4 delivers pure motorsport technology into a production model for unparalleled track performance.",
    price: "AED 320,000",
    image: "/inventory/BMW-M4-2022-Blue.png",
  },
  {
    id: 3,
    slug: "cadillac-escalade-sport-platinum",
    name: "Cadillac Escalade",
    subtitle: "2026 SPORT PLATINUM",
    specs: "Red | 5.9 S | Automatic",
    description: "The Escalade Sport Platinum blends commanding presence with incredible luxury and state-of-the-art technology.",
    price: "AED 490,000",
    image: "/inventory/Cadillac-Escalade-Sport-Platinum-2026-Red.png",
  },
  {
    id: 4,
    slug: "lamborghini-urus-performante",
    name: "Lamborghini Urus",
    subtitle: "2024 PERFORMANTE",
    specs: "Gray | 3.3 S | Automatic",
    description: "The Urus Performante elevates the Super SUV to a new level of performance, combining extreme driving dynamics with bold design.",
    price: "AED 1,150,000",
    image: "/inventory/Lamborghini-Urus-Performante-2024-Gray.png",
  }
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
            No vehicles found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
