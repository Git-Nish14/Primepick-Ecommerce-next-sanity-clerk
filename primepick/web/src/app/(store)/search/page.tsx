import { searchProductsByName } from "../../../../lib/products/searchProductsByName";
import { imageURL } from "../../../../lib/image";
import Image from "next/image";
import { PortableText } from "next-sanity";
import AddToBasketButton from "@/components/AddToBasketButton";
import Link from "next/link";

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const products = await searchProductsByName(query);

  return (
    <div className="pt-24 pb-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-gray-900 font-medium">Search Results</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Search Results
              </h1>
              <p className="text-gray-600">
                {products.length > 0 ? (
                  <>
                    Found{" "}
                    <span className="font-semibold">{products.length}</span>{" "}
                    {products.length === 1 ? "result" : "results"} for "
                    <span className="font-semibold text-blue-600">{query}</span>
                    "
                  </>
                ) : (
                  <>
                    No results found for "
                    <span className="font-semibold text-gray-900">{query}</span>
                    "
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {products.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <svg
              className="w-20 h-20 text-gray-300 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No products found
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              We couldn't find any products matching "{query}". Try searching
              with different keywords or check your spelling.
            </p>
            <Link
              href="/"
              className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {products.map((product: any) => {
              const isOutOfStock = product.stock != null && product.stock <= 0;
              const isLowStock =
                product.stock != null &&
                product.stock > 0 &&
                product.stock <= 10;

              return (
                <div
                  key={product._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Product Image */}
                    <Link
                      href={`/product/${product.slug?.current}`}
                      className="relative w-full md:w-64 lg:w-80 aspect-square md:aspect-auto flex-shrink-0 overflow-hidden bg-gray-50 group"
                    >
                      {product.image ? (
                        <Image
                          src={imageURL(product.image).url()}
                          alt={product.name ?? "Product image"}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
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

                      {/* Low Stock Badge */}
                      {!isOutOfStock && isLowStock && (
                        <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                          Only {product.stock} left
                        </div>
                      )}
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 p-6 sm:p-8 flex flex-col">
                      <div className="flex-1">
                        <Link
                          href={`/product/${product.slug?.current}`}
                          className="group"
                        >
                          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {product.name}
                          </h2>
                        </Link>

                        {/* Stock Status Badge */}
                        {isOutOfStock ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 mb-4">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Out of Stock
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 mb-4">
                            <svg
                              className="w-3 h-3 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            In Stock
                          </span>
                        )}

                        {/* Description */}
                        <div className="prose prose-sm max-w-none text-gray-700 mb-6 line-clamp-3">
                          {Array.isArray(product.description) && (
                            <PortableText
                              value={product.description}
                              components={{
                                block: {
                                  normal: ({ children }) => (
                                    <p className="mb-2">{children}</p>
                                  ),
                                  h4: ({ children }) => (
                                    <h4 className="text-base font-semibold mb-2">
                                      {children}
                                    </h4>
                                  ),
                                },
                              }}
                            />
                          )}
                        </div>
                      </div>

                      {/* Price and Action */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-200">
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl sm:text-4xl font-bold text-blue-600">
                            ${product.price?.toFixed(2)}
                          </span>
                          {!isOutOfStock && isLowStock && (
                            <span className="text-sm text-orange-600 font-medium">
                              Low stock
                            </span>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <Link
                            href={`/product/${product.slug?.current}`}
                            className="flex-1 sm:flex-none bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg transition-colors text-center"
                          >
                            View Details
                          </Link>
                          <div className="flex-1 sm:flex-none">
                            <AddToBasketButton
                              product={product}
                              disabled={isOutOfStock}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
