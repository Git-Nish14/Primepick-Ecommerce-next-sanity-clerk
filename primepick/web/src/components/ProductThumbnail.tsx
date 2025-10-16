import { Product } from "../../sanity.types";
import Link from "next/link";
import Image from "next/image";
import { imageURL } from "../../lib/image";

function ProductThumb({ product }: { product: Product }) {
  const stock = product.stock ?? 0;
  const isOutOfStock = stock <= 0;

  return (
    <Link
      href={`/product/${product.slug?.current || "#"}`}
      className={`group flex flex-col bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-full ${
        isOutOfStock ? "opacity-60" : ""
      }`}
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-50">
        {product.image ? (
          <Image
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            src={imageURL(product.image).url()}
            alt={product.name || "Product image"}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-20 h-20 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
            <div className="bg-red-500 text-white font-bold text-sm sm:text-base px-4 py-2 rounded-full shadow-lg">
              Out of Stock
            </div>
          </div>
        )}

        {/* Stock Badge */}
        {!isOutOfStock && stock <= 10 && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow-md">
            Only {stock} left
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </h2>

        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-3 flex-1">
          {product.description
            ?.map((block) =>
              block._type === "block"
                ? block.children?.map((child) => child.text).join("")
                : ""
            )
            .join(" ") || "No description available"}
        </p>

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold text-blue-600">
              ${product.price?.toFixed(2)}
            </span>
            {!isOutOfStock && (
              <span className="text-xs text-gray-500 mt-0.5">
                {stock > 10 ? "In Stock" : `${stock} available`}
              </span>
            )}
          </div>

          <div className="flex items-center text-blue-600 group-hover:text-blue-700 font-medium text-sm">
            <span className="hidden sm:inline mr-1">View</span>
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductThumb;
