import { FilterSidebar } from "./components/filter-sidebar";
import { CarGrid } from "./components/car-grid";

export function InventoryPage() {
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
            <FilterSidebar />
          </aside>

          {/* Main Grid */}
          <main className="flex-1">
            <CarGrid />
          </main>
        </div>

      </div>
    </div>
  );
}
