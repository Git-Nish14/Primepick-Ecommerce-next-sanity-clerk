import { searchProductsByName } from "../../../../lib/products/searchProductsByName";
import { imageURL } from "../../../../lib/image";
import Image from "next/image";
import { PortableText } from "next-sanity";
import AddToBasketButton from "@/components/AddToBasketButton";

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const products = await searchProductsByName(query);

  return (
    <div className="mt-[8rem] md:mt-[4rem] container mx-auto max-w-5xl px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-12 ">
      {/* ✅ Title at the Top (Styled Responsively) */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-700 mb-8 text-left">
        Search results for "{query}"
      </h1>

      {/* ✅ If No Products Found */}
      {products.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 w-full text-center">
          <h2 className="text-xl sm:text-2xl font-semibold text-red-600 mb-4">
            No products found for: {query}
          </h2>
          <p className="text-gray-600 text-md sm:text-lg">
            Try searching with different keywords.
          </p>
        </div>
      ) : (
        /* ✅ Display Products Properly Aligned */
        <div className="flex flex-col gap-12">
          {products.map((product: any) => {
            const isOutOfStock = product.stock != null && product.stock <= 0;

            return (
              <div
                key={product._id}
                className="flex flex-col md:flex-row items-center justify-between gap-8"
              >
                {/* ✅ Product Image Section (Fixed Size & Proper Alignment) */}
                <div
                  className={`relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] aspect-square overflow-hidden rounded-lg shadow-lg ${
                    isOutOfStock ? "opacity-50" : ""
                  }`}
                >
                  {product.image && (
                    <Image
                      src={imageURL(product.image).url()}
                      alt={product.name ?? "Product image"}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  )}
                  {isOutOfStock && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                      <span className="text-white font-bold text-lg">
                        Out Of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* ✅ Product Info Section (Fixed PortableText Issue) */}
                <div className="flex-1 p-4 sm:p-8 md:p-10 border border-gray-300 rounded-lg shadow-lg bg-white w-full max-w-[500px]">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-red-700">
                    {product.name}
                  </h2>

                  {/* ✅ FIXED: PortableText Structure (No <h4> inside <p>) */}
                  <div className="prose max-w-none mb-5 text-gray-700">
                    {Array.isArray(product.description) && (
                      <PortableText
                        value={product.description}
                        components={{
                          block: {
                            normal: ({ children }) => (
                              <p className="mb-3">{children}</p>
                            ),
                            h4: ({ children }) => (
                              <h4 className="text-lg font-semibold">
                                {children}
                              </h4>
                            ),
                          },
                        }}
                      />
                    )}
                  </div>

                  <div className="text-lg sm:text-xl md:text-2xl text-blue-500 font-semibold mb-3">
                    ${product.price?.toFixed(2)}
                  </div>

                  <div className="mt-6">
                    <AddToBasketButton
                      product={product}
                      disabled={isOutOfStock}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchPage;
