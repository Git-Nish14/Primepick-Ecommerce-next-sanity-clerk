import React from "react";
import { Button } from "@/components/ui/button";
import { getAllproducts } from "@/sanity/lib/products/getAllproducts";

export default async function Home() {
  const products = await getAllproducts();

  return (
    <div>
      <h1>hello world 123</h1>
      <Button>Click me </Button>
    </div>
  );
}
