import { CarSlugPage } from "@/features/inventory/slug";

export default async function CarDetailsRoute({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <CarSlugPage id={id} />;
}
