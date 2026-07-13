import React from "react";
import { products } from "../../../data/products";
import { ProductDetailContainer } from "./ProductDetailContainer";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductDetailContainer productId={id} />;
}
