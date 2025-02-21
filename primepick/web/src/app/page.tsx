import React from "react";
import ProductsView from "@/components/productsView"; // Ensure PascalCase
import { getAllproducts } from "../../lib/products/getAllproducts";
import { getAllCategories } from "../../lib/products/getAllCategories";
import Layout from "@/components/layout";
import HoliBanner from "@/components/HoliBanner";

export default async function Home() {
  const products = await getAllproducts();
  const categories = await getAllCategories();

  return (
    <Layout>
      {/* Responsive margin fixes */}
      <div className="mt-40 sm:mt-10 md:mt-14 lg:mt-16 w-full">
        <HoliBanner />
      </div>

      <div className="container mx-auto flex flex-col items-center md:items-start justify-start min-h-screen bg-gray-100 px-4 sm:px-6 md:px-8 lg:px-10 w-full">
        <ProductsView products={products} categories={categories} />
      </div>
    </Layout>
  );
}
