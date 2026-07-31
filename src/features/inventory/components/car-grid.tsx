"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SearchX, Loader2, ChevronDown } from "lucide-react";
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

const PAGE_SIZE = 9;

export function CarGrid({ cars, filters }: CarGridProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(() => {
    return searchParams.get("q") || "";
  });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Reset pagination on filter or search change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [searchQuery, filters]);

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
    const keywords = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);
    const searchableText = `${car.name} ${car.specs} ${car.subtitle || ''} ${car.description || ''} ${car.features?.join(' ') || ''}`.toLowerCase();
    const matchesSearch = keywords.length === 0 || keywords.every(kw => searchableText.includes(kw));
    
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

  const displayedInventory = filteredInventory.slice(0, visibleCount);
  const hasMore = visibleCount < filteredInventory.length;

  const handleLoadMore = () => {
    if (hasMore && !isLoadingMore) {
      setIsLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, filteredInventory.length));
        setIsLoadingMore(false);
      }, 250);
    }
  };

  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoadingMore) {
          handleLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: "300px" }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [hasMore, isLoadingMore, filteredInventory.length, visibleCount]);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-normal text-white">
          Showing {displayedInventory.length} of {filteredInventory.length} Vehicles
        </h2>
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
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {displayedInventory.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
        {filteredInventory.length === 0 && (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center border border-white/10 bg-[#18181b] rounded-lg">
            <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center mb-4">
              <SearchX className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-normal text-white mb-2">Vehicle Not Found</h3>
            <p className="max-w-md mb-6 font-light text-white/80">
              This car is currently unavailable. Share your requirements, and our team will source it for you.
            </p>
            <a 
              href={searchQuery ? `/contact?message=${encodeURIComponent(`I am looking to source a vehicle. My specific requirement is: "${searchQuery}". Please let me know if you can assist.`)}` : "/contact"} 
              className="bg-accent hover:bg-accent/90 text-black font-normal px-8 py-3 rounded-lg transition-colors"
            >
              Share Details
            </a>
          </div>
        )}
      </div>

      {/* Infinite Scroll Sentinel & Load More Trigger */}
      {hasMore && (
        <div ref={sentinelRef} className="pt-10 pb-6 flex flex-col items-center justify-center gap-3">
          {isLoadingMore ? (
            <div className="flex items-center gap-2 text-accent text-sm font-medium animate-pulse">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading more vehicles...</span>
            </div>
          ) : (
            <button
              onClick={handleLoadMore}
              className="px-6 py-2.5 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 text-white text-sm font-medium flex items-center gap-2 transition-all group"
            >
              <span>Load More Vehicles ({filteredInventory.length - visibleCount} remaining)</span>
              <ChevronDown className="w-4 h-4 text-accent transition-transform group-hover:translate-y-0.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
