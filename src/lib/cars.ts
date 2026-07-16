import { getPayload } from 'payload'
import configPromise from '@payload-config'

export type CarData = {
  id: number;
  name: string;
  subtitle?: string;
  slug: string;
  specs: string;
  price: string;
  image: string;
  gallery?: string[];
  features?: string[];
  description?: string;
  kmDriven?: string;
  color?: string;
  engine?: string;
  year?: number;
  vin?: string;
};

export type CarDataWithMdx = CarData & {
  mdxSource: string;
};

export type BrandData = {
  id: number;
  name: string;
  image: string;
};

export async function getAllBrands(): Promise<BrandData[]> {
  const payload = await getPayload({ config: configPromise })
  
  try {
    const brandsRes = await payload.find({
      collection: 'brands',
      limit: 100,
    })

    return brandsRes.docs.map((brand: any) => {
      const imageUrl = brand.logo?.url || '/placeholder.png';
      return {
        id: brand.id,
        name: brand.name,
        image: imageUrl,
      }
    })
  } catch (error) {
    console.error("Error fetching brands from Payload:", error);
    return [];
  }
}

export async function getAllCars(): Promise<CarData[]> {
  const payload = await getPayload({ config: configPromise })
  
  try {
    const carsRes = await payload.find({
      collection: 'cars',
      limit: 100,
    })

    return carsRes.docs.map((car: any) => {
      const images = car.images || [];
      const firstImageUrl = images.length > 0 && images[0].image ? images[0].image.url : '/placeholder.png';
      const gallery = images.map((img: any) => img.image?.url).filter(Boolean);

      return {
        id: car.id,
        name: `${car.make} ${car.model}`,
        subtitle: String(car.year),
        slug: car.slug || String(car.id),
        specs: `${car.color || 'N/A'} | ${car.year || 'N/A'} | ${car.engine || 'N/A'}`,
        price: `${car.currency || 'AED'} ${car.price.toLocaleString()}`,
        image: firstImageUrl,
        gallery,
        features: car.features?.map((f: any) => f.feature).filter(Boolean) || [],
        description: car.description || "",
        kmDriven: car.kmDriven,
        color: car.color,
        engine: car.engine,
        year: car.year,
        vin: car.vin,
      }
    })
  } catch (error) {
    console.error("Error fetching cars from Payload:", error);
    return [];
  }
}

export async function getCarBySlug(slug: string): Promise<CarDataWithMdx | undefined> {
  const payload = await getPayload({ config: configPromise })
  try {
    const carRes = await payload.find({
      collection: 'cars',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })
    
    console.log("getCarBySlug query result for", slug, ":", carRes.docs.length);
    if (!carRes.docs || carRes.docs.length === 0) return undefined;
    const car = carRes.docs[0] as any;
    
    const images = car.images || [];
    const firstImageUrl = images.length > 0 && images[0].image ? images[0].image.url : '/placeholder.png';
    const gallery = images.map((img: any) => img.image?.url).filter(Boolean);

    return {
      id: car.id,
      name: `${car.make} ${car.model}`,
      subtitle: String(car.year),
      slug: car.slug || String(car.id),
      specs: `${car.color || 'N/A'} | ${car.year || 'N/A'} | ${car.engine || 'N/A'}`,
      price: `${car.currency || 'AED'} ${car.price.toLocaleString()}`,
      image: firstImageUrl,
      gallery,
      features: car.features?.map((f: any) => f.feature).filter(Boolean) || [],
      description: car.description || "",
      mdxSource: car.description || "",
      kmDriven: car.kmDriven,
      color: car.color,
      engine: car.engine,
      year: car.year,
      vin: car.vin,
    };
  } catch (e) {
    console.error("Error fetching car by id:", e);
    return undefined;
  }
}

export type ReviewData = {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
};

export async function getAllReviews(): Promise<ReviewData[]> {
  const payload = await getPayload({ config: configPromise })
  
  try {
    const reviewsRes = await payload.find({
      collection: 'reviews',
      limit: 100,
    })

    return reviewsRes.docs.map((review: any) => {
      return {
        id: review.id,
        name: review.name,
        role: review.role,
        content: review.content,
        rating: review.rating || 5,
      }
    })
  } catch (error) {
    console.error("Error fetching reviews from Payload:", error);
    return [];
  }
}
