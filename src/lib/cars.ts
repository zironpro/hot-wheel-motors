import fs from "fs";
import path from "path";
import matter from "gray-matter";

const carsDirectory = path.join(process.cwd(), "src/content/cars");

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
  description?: string; // used for legacy backward compatibility if needed
};

export type CarDataWithMdx = CarData & {
  mdxSource: string;
};

export function getAllCars(): CarData[] {
  // Check if directory exists first
  if (!fs.existsSync(carsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(carsDirectory);
  const allCarsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const fullPath = path.join(carsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the car metadata section
      const matterResult = matter(fileContents);

      return {
        ...(matterResult.data as CarData),
        slug: matterResult.data.slug || fileName.replace(/\.mdx$/, ""),
        description: matterResult.content, // Fallback text description
      };
    });

  // Sort cars by id
  return allCarsData.sort((a, b) => (a.id < b.id ? -1 : 1));
}

export function getCarBySlug(slug: string): CarDataWithMdx | undefined {
  try {
    const fullPath = path.join(carsDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    return {
      ...(matterResult.data as CarData),
      slug: matterResult.data.slug || slug,
      mdxSource: matterResult.content,
    };
  } catch (e) {
    return undefined; // File not found or parsing error
  }
}
