import ProductsGrid from "@/components/productGrid";
import { Category, Product } from "../../sanity.types";

interface ProductsViewProps {
  products: Product[];
  categories: Category[];
}
const ProductsView = ({ products, categories }: ProductsViewProps) => {
  console.log("ProductsView props:", { products, categories });
  return (
    <div className="flex flex-col">
      {/* Categories Section */}
      <div className="w-full sm:w-[200px]"></div>

      {/* Products Section */}
      <div className="flex-1">
        <ProductsGrid products={products} />
        <hr className="w-1/2 sm:w-3/4" />
      </div>
    </div>
  );
};

export default ProductsView;
