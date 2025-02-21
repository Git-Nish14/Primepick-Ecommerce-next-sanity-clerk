import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getProductBySlug = async (slug: string, string: any) => {
  const PRODUCT_BY_ID_QUERY = defineQuery(`
    *[_type == "product" && slug.current == $slug] | order(name asc) [0]
  `);

  try {
    // Fetch the product using the slug as a parameter
    const product = await sanityFetch({
      query: PRODUCT_BY_ID_QUERY,
      params: {
        slug,
      },
    });

    // Return the product or null if not found
    return product.data || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};
