import ProductsView from "@/components/productsView";
import { getAllCategories } from "../../../../../lib/products/getAllCategories";
import { getProductsByCategory } from "../../../../../lib/products/getProductsByCategory";

async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const products = await getProductsByCategory(slug);
  const categories = await getAllCategories();

  return (
    <div className="md:mt-[4rem] mt-[9rem] flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl md:max-w-max ">
        <h1 className="text-3xl font-bold mb-6 text-center">
          {slug
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join("")}{" "}
          collection
        </h1>
        <ProductsView products={products} categories={categories} />
      </div>
    </div>
  );
}

export default CategoryPage;
