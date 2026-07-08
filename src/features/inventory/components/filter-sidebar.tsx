import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const FILTER_DATA = {
  makes: [
    { id: "mercedes", label: "Mercedes-Benz", count: 12 },
    { id: "porsche", label: "Porsche", count: 8 },
    { id: "bmw", label: "BMW", count: 15 },
    { id: "audi", label: "Audi", count: 10 },
    { id: "land-rover", label: "Land Rover", count: 6 },
  ],
  bodyTypes: [
    { id: "suv", label: "SUV", count: 24 },
    { id: "sedan", label: "Sedan", count: 18 },
    { id: "sports", label: "Sports", count: 9 },
  ],
  priceRanges: [
    { id: "under-100k", label: "Under AED 100,000", count: 15 },
    { id: "100k-200k", label: "AED 100,000 - AED 200,000", count: 20 },
    { id: "over-200k", label: "Over AED 200,000", count: 16 },
  ],
};

export function FilterSidebar() {
  return (
    <div className="w-full bg-[#09090b] border border-white/10 rounded-lg p-8 sticky top-28 max-h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-8 shrink-0">
        <h2 className="text-xl font-normal text-white">Filters</h2>
        <Button variant="link" className="text-muted-foreground hover:text-white px-0 h-auto">
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
                {FILTER_DATA.makes.map((make) => (
                  <div key={make.id} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                      <Checkbox id={`make-${make.id}`} className="border-white/20 data-[state=checked]:bg-accent data-[state=checked]:text-black" />
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
                {FILTER_DATA.priceRanges.map((range) => (
                  <div key={range.id} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                      <Checkbox id={`price-${range.id}`} className="border-white/20 data-[state=checked]:bg-accent data-[state=checked]:text-black" />
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
                {FILTER_DATA.bodyTypes.map((body) => (
                  <div key={body.id} className="flex items-center justify-between group">
                    <div className="flex items-center space-x-4">
                      <Checkbox id={`body-${body.id}`} className="border-white/20 data-[state=checked]:bg-accent data-[state=checked]:text-black" />
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
      
      <div className="mt-6 shrink-0">
         <Button className="w-full font-normal">
            Apply Filters
         </Button>
      </div>
    </div>
  );
}
