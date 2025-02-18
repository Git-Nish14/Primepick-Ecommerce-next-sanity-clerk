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
      <div>
        <HoliBanner />
      </div>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={[]} />
      </div>
    </Layout>
  );
}
