import { getPageBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";

async function loader(slug: string) {
  const data = await getPageBySlug(slug);
  if (!data || data.length === 0) notFound();
  return { sections: data[0]?.sections };

  interface PageProps {
    params: Promise<{slug: string}>
  }
  export default async function DynamicPageRoute({
    params
  }: PageProps) {
    const slug = (await params).slug
    const {sections} = await loader(slug)
    return <SectionRenderer sections={sections} />
  }