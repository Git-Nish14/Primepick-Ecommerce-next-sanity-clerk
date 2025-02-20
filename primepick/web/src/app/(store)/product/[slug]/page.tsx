import { notFound } from "next/navigation";
import { getProductBySlug } from "../../../../../lib/products/getProductBySlug";
import { imageURL } from "../../../../../lib/image";
import Image from "next/image";
import { PortableText } from "next-sanity";
import AddToBasketButton from "@/components/AddToBasketButton";

async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className=" mt-[8rem] md:mt-[4rem] container mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          className={` mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16 relative w-full max-w-[400px] mx-auto aspect-square overflow-hidden rounded-lg shadow-lg ${
            isOutOfStock ? "opacity-50" : ""
          }`}
        >
          {product.image && (
            <Image
              src={imageURL(product.image).url()}
              alt={product.name ?? "Product image"}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out Of Stock</span>
            </div>
          )}
        </div>
        <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-12 xl:mt-16 p-6 border border-gray-300 rounded-lg shadow-lg bg-white max-w-2xl mx-auto">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3 text-red-700">
              {product.name}
            </h1>
            <div className="prose max-w-none mb-5 text-gray-700">
              {Array.isArray(product.description) && (
                <PortableText value={product.description} />
              )}
            </div>

            <div className="text-lg md:text-2xl  text-blue-500 font-semibold mb-3">
              ${product.price?.toFixed(2)}
            </div>
          </div>
          <div className="mt-6">
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
