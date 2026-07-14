"use client";

import { useState, useEffect } from "react";
import { FilterSidebar } from "./components/filter-sidebar";
import { CarGrid } from "./components/car-grid";
import { CarData } from "@/lib/cars";
import { Filter } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

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

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full bg-[#050505] border-white/10 text-white font-normal h-12 flex justify-between items-center px-4 hover:bg-[#0a0a0a]">
                <span className="flex items-center text-base">
                  <Filter className="w-4 h-4 mr-2 text-accent" />
                  Filters
                </span>
                {((filters.makes.length + filters.priceRanges.length + filters.bodyTypes.length) > 0) && (
                  <span className="text-xs text-white/90 bg-accent px-2 py-1 rounded-full border border-white/10 text-black">
                    {filters.makes.length + filters.priceRanges.length + filters.bodyTypes.length} Active
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh] bg-[#050505] border-t-white/10 text-white px-0 pt-8 pb-6 [&>button>svg]:text-white flex flex-col">
              <SheetTitle className="sr-only">Filters</SheetTitle>
              <SheetDescription className="sr-only">Select filters for the cars</SheetDescription>
              <div className="px-4 flex-1 overflow-y-auto hide-scrollbar">
                <FilterSidebar cars={initialCars} filters={filters} setFilters={setFilters} />
              </div>
              <div className="px-4 pt-4 mt-2">
                <SheetClose asChild>
                  <Button className="w-full h-12 bg-accent hover:bg-accent/90 text-black font-normal uppercase tracking-widest transition-colors">
                    Show Vehicles
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-full lg:w-1/4 xl:w-1/5 flex-shrink-0">
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
