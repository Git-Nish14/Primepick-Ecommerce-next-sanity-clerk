import { Category, Product } from "../../sanity.types";
import ProductsGrid from "@/components/productGrid";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}

const ProductsView = ({ products }: ProductsViewProps) => {
  return (
    <div className="flex flex-col">
      {/* Categories Section */}
      <div className="w-full sm:w-[200px]">
        {/* Uncomment when category selector is available */}
        {/* <CategorySelectorComponent categories={categories} /> */}
      </div>

      {/* Products Section */}
      <div className="flex-1">
        <ProductsGrid products={products} />
        <hr className="w-1/2 sm:w-3/4" />
      </div>
    </div>
  );
};

export default ProductsView;
