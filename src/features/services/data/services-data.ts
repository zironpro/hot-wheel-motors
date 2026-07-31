export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  iconName?: string;
}

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: "01",
    title: "Vehicle Sourcing",
    description: "Bespoke global acquisition service matching your exact specifications, rare allocations, and private collection desires.",
    image: "/services-page-images/vehicle-sourcing.webp",
    iconName: "Search",
  },
  {
    id: "02",
    title: "Tailored Financing",
    description: "Tailored financial solutions and premier insurance coverage individually crafted for high-value luxury automotive assets.",
    image: "/services-page-images/finance-planning.webp",
    iconName: "Banknote",
  },
  {
    id: "03",
    title: "Worldwide Export",
    description: "Secure international logistics, door-to-door transport, and customs clearance for worldwide vehicle delivery.",
    image: "/services-page-images/worldwide-export.webp",
    iconName: "Globe",
  },
  {
    id: "04",
    title: "Extended Warranty",
    description: "Comprehensive coverage packages providing peace of mind and protection for timeless mechanical performance.",
    image: "/services-page-images/extended-warranty.webp",
    iconName: "Shield",
  },
  {
    id: "05",
    title: "Consignment & Trade-In",
    description: "Seamless valuation and transparent exchange process ensuring maximum residual value for your high-performance automobile.",
    image: "/services-page-images/consignment-trade-in.webp",
    iconName: "RefreshCw",
  },
  {
    id: "06",
    title: "Registration & Insurance",
    description: "Complete white-glove registration, documentation, and tailored insurance management for seamless ownership.",
    image: "/services-page-images/registration-insurance.webp",
    iconName: "FileText",
  },
];
