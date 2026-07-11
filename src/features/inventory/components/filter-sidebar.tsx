"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CarData } from "@/lib/cars";

interface Filters {
  makes: string[];
  priceRanges: string[];
  bodyTypes: string[];
}

interface FilterSidebarProps {
  cars: CarData[];
  filters: Filters;
  setFilters: (filters: Filters) => void;
}

export function FilterSidebar({ cars, filters, setFilters }: FilterSidebarProps) {
  // Compute dynamic counts based on the current cars
  
  // Makes
  const makeList = [
    { id: "audi", label: "Audi" },
    { id: "bmw", label: "BMW" },
    { id: "mercedes", label: "Mercedes-Benz" },
    { id: "porsche", label: "Porsche" },
    { id: "range rover", label: "Range Rover" },
    { id: "cadillac", label: "Cadillac" },
    { id: "chevrolet", label: "Chevrolet" },
    { id: "lamborghini", label: "Lamborghini" },
    { id: "jeep", label: "Jeep" },
    { id: "ford", label: "Ford" },
  ];

  const makes = makeList.map(make => {
    const count = cars.filter(c => c.name.toLowerCase().includes(make.id)).length;
    return { ...make, count };
  }).filter(m => m.count > 0);

  // Price Ranges
  const priceRanges = [
    { id: "under-150k", label: "Under AED 150,000", min: 0, max: 150000 },
    { id: "150k-300k", label: "AED 150,000 - AED 300,000", min: 150000, max: 300000 },
    { id: "300k-500k", label: "AED 300,000 - AED 500,000", min: 300000, max: 500000 },
    { id: "over-500k", label: "Over AED 500,000", min: 500000, max: Infinity },
    { id: "on-request", label: "Price on Request", min: -1, max: -1 },
  ];

  const priceRangesWithCount = priceRanges.map(range => {
    const count = cars.filter(c => {
      if (range.id === "on-request") return c.price.toLowerCase().includes("request") || c.price === "N/A" || !c.price.includes("AED");
      const priceNum = parseInt(c.price.replace(/[^0-9]/g, ''), 10);
      if (isNaN(priceNum)) return false;
      return priceNum >= range.min && priceNum < range.max;
    }).length;
    return { ...range, count };
  }).filter(r => r.count > 0);

  // Body Types (Inferred from features or names)
  const suvKeywords = ["x5", "x7", "q8", "escalade", "suburban", "silverado", "f-150", "f250", "cr-v", "wrangler", "cherokee", "urus", "gle", "gls", "g550", "g63", "g580", "levante", "cayenne", "range rover", "durango", "expedition"];
  const sportsKeywords = ["m8", "camaro", "corvette", "aventador", "targa", "carrera", "rs3", "m4", "m3"];
  
  const getBodyType = (carName: string) => {
    const n = carName.toLowerCase();
    if (suvKeywords.some(k => n.includes(k))) return "suv";
    if (sportsKeywords.some(k => n.includes(k))) return "sports";
    return "sedan"; // Default fallback
  };

  const bodyTypes = [
    { id: "suv", label: "SUV" },
    { id: "sedan", label: "Sedan" },
    { id: "sports", label: "Sports" },
  ].map(body => {
    const count = cars.filter(c => getBodyType(c.name) === body.id).length;
    return { ...body, count };
  }).filter(b => b.count > 0);

  const handleMakeChange = (id: string, checked: boolean) => {
    const newMakes = checked ? [...filters.makes, id] : filters.makes.filter(m => m !== id);
    setFilters({ ...filters, makes: newMakes });
  };

  const handlePriceChange = (id: string, checked: boolean) => {
    const newPrices = checked ? [...filters.priceRanges, id] : filters.priceRanges.filter(p => p !== id);
    setFilters({ ...filters, priceRanges: newPrices });
  };

  const handleBodyChange = (id: string, checked: boolean) => {
    const newBodies = checked ? [...filters.bodyTypes, id] : filters.bodyTypes.filter(b => b !== id);
    setFilters({ ...filters, bodyTypes: newBodies });
  };

  const clearFilters = () => {
    setFilters({ makes: [], priceRanges: [], bodyTypes: [] });
  };

  return (
    <div className="w-full bg-[#09090b] border border-white/10 rounded-lg p-8 sticky top-28 max-h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-8 shrink-0">
        <h2 className="text-xl font-normal text-white">Filters</h2>
        <Button variant="link" onClick={clearFilters} className="text-muted-foreground hover:text-white px-0 h-auto">
          Reset All
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 hide-scrollbar">
        <Accordion type="multiple" defaultValue={["make", "price", "body"]} className="w-full">
          <AccordionItem value="make" className="border-white/10">
            <AccordionTrigger className="text-white hover:no-underline hover:text-accent transition-colors">
              Make
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-5 pt-4 pb-2">
                {makes.map((make) => (
                  <div key={make.id} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                      <Checkbox 
                        id={`make-${make.id}`} 
                        checked={filters.makes.includes(make.id)}
                        onCheckedChange={(c) => handleMakeChange(make.id, c as boolean)}
                        className="border-white/20 data-[state=checked]:bg-accent data-[state=checked]:text-black" 
                      />
                      <Label
                        htmlFor={`make-${make.id}`}
                        className="text-sm font-normal leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground group-hover:text-white cursor-pointer transition-colors"
                      >
                        {make.label}
                      </Label>
                    </div>
                    <span className="text-xs text-muted-foreground ml-3 shrink-0">({make.count})</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="price" className="border-white/10">
            <AccordionTrigger className="text-white hover:no-underline hover:text-accent transition-colors">
              Price Range
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-5 pt-4 pb-2">
                {priceRangesWithCount.map((range) => (
                  <div key={range.id} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                      <Checkbox 
                        id={`price-${range.id}`} 
                        checked={filters.priceRanges.includes(range.id)}
                        onCheckedChange={(c) => handlePriceChange(range.id, c as boolean)}
                        className="border-white/20 data-[state=checked]:bg-accent data-[state=checked]:text-black" 
                      />
                      <Label
                        htmlFor={`price-${range.id}`}
                        className="text-sm font-normal leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground group-hover:text-white cursor-pointer transition-colors"
                      >
                        {range.label}
                      </Label>
                    </div>
                    <span className="text-xs text-muted-foreground ml-3 shrink-0">({range.count})</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="body" className="border-white/10 border-b-0">
            <AccordionTrigger className="text-white hover:no-underline hover:text-accent transition-colors">
              Body Type
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-5 pt-4 pb-2">
                {bodyTypes.map((body) => (
                  <div key={body.id} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                      <Checkbox 
                        id={`body-${body.id}`} 
                        checked={filters.bodyTypes.includes(body.id)}
                        onCheckedChange={(c) => handleBodyChange(body.id, c as boolean)}
                        className="border-white/20 data-[state=checked]:bg-accent data-[state=checked]:text-black" 
                      />
                      <Label
                        htmlFor={`body-${body.id}`}
                        className="text-sm font-normal leading-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground group-hover:text-white cursor-pointer transition-colors"
                      >
                        {body.label}
                      </Label>
                    </div>
                    <span className="text-xs text-muted-foreground ml-3 shrink-0">({body.count})</span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
    </div>
  );
}
