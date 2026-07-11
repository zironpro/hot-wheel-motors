"use client";

import { useState, useEffect } from "react";
import { FilterSidebar } from "./components/filter-sidebar";
import { CarGrid } from "./components/car-grid";
import { CarData } from "@/lib/cars";

interface InventoryPageProps {
  initialCars: CarData[];
}

export interface Filters {
  makes: string[];
  priceRanges: string[];
  bodyTypes: string[];
}

export function InventoryPage({ initialCars }: InventoryPageProps) {
  const [filters, setFilters] = useState<Filters>({ makes: [], priceRanges: [], bodyTypes: [] });

  useEffect(() => {
    // Only run on client
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const makeParam = params.get('make');
      if (makeParam) {
        setFilters(prev => ({ ...prev, makes: [makeParam.toLowerCase()] }));
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-white tracking-tight mb-4">
            Explore Our Collections
          </h1>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 xl:w-1/5 flex-shrink-0">
            <FilterSidebar cars={initialCars} filters={filters} setFilters={setFilters} />
          </aside>

          {/* Main Grid */}
          <main className="flex-1">
            <CarGrid cars={initialCars as any} filters={filters} />
          </main>
        </div>

      </div>
    </div>
  );
}
