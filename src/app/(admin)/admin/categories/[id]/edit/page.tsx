import CategoryEditForm from "@/modules/category/components/category-edit-form";

interface EditCategoryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCategoryPage({
  params,
}: EditCategoryPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-2xl">
        
        <div className="mb-8">
          <p className="text-sm font-medium text-cyan-400">
            Administration
          </p>

          <h1 className="mt-2 text-3xl font-bold text-white">
            Edit Category
          </h1>

          <p className="mt-2 text-white/40">
            Update your course category.
          </p>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-2xl">
          <CategoryEditForm id={id} />
        </section>

      </div>
    </main>
  );
}