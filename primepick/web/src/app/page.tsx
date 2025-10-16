import React from "react";
import ProductsView from "@/components/productsView";
import { getAllproducts } from "../../lib/products/getAllproducts";
import { getAllCategories } from "../../lib/products/getAllCategories";
import Layout from "@/components/layout";
import HoliBanner from "@/components/HoliBanner";

export default async function Home() {
  const products = await getAllproducts();
  const categories = await getAllCategories();

  return (
    <Layout>
      <div className="flex flex-col w-full min-h-screen bg-gray-50">
        {/* Banner Section with proper spacing from fixed header */}
        <div className="pt-20 lg:pt-24 pb-4 bg-gray-50">
          <HoliBanner />
        </div>

        {/* Main Content Section */}
        <main className="flex-1 w-full bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <ProductsView products={products} categories={categories} />
          </div>
        </main>
      </div>
    </Layout>
  );
}
