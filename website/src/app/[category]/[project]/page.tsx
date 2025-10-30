import ModifiedImage from "@/components/common/ModifiedImage";
import { getCategoryViaSlug } from "@/lib/helper";
import { generateProjectMetadata } from "@/lib/metadataHelper";
import {
  fetchProjectBySlug,
  fetchProjectCategories,
  fetchProjectListByCategory,
} from "@/lib/strapiApiCall";

export async function generateStaticParams() {
  const categories = await fetchProjectCategories();
  const params: { category: string; project: string }[] = [];

  await Promise.all(
    categories.map(async (cat) => {
      const { displayName } = getCategoryViaSlug(cat);
      const projects = await fetchProjectListByCategory(displayName);
      projects.forEach((project) => {
        params.push({ category: cat, project: project.slug });
      });
    })
  );

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; project: string }>;
}) {
  const slug = (await params).project;
  return await generateProjectMetadata(slug);
}

async function page({
  params,
}: {
  params: Promise<{ category: string; project: string }>;
}) {
  const { category, project: projectSlug } = await params;

  const project = await fetchProjectBySlug(projectSlug);
  if (!project) {
    return (
      <div>
        <h1 className="text-black text-center text-sm font-semibold">
          Coming soon.
        </h1>
      </div>
    );
  }

  const { displayName } = getCategoryViaSlug(category);

  return (
    <div>
      {project.description && (
        <div
          className="text-black text-xs mb-8 tracking-widest px-5 md:px-0 leading-7 whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />
      )}

      {project.products.length === 0 ? (
        <h1 className="text-black text-center text-sm font-semibold">
          Coming soon.
        </h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
          {project.products.map((product, index) => (
            <ModifiedImage
              key={product.documentId}
              category={{ title: displayName }}
              project={product}
              href={`/${category}/${projectSlug}/${product.slug}`}
              mime={product.images[0].mime}
              priority={[0, 1].includes(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default page;
