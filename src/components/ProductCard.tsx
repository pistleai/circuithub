import React from "react";
import { Product } from "../types/product";
import { Card, CardContent, CardHeader } from "./ui/Card";
import { Badge } from "./ui/Badge";
import { ProductImage } from "./ProductImage";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Card className="group overflow-hidden border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full bg-white">
      {/* Product Image section with zoom transition */}
      <div className="w-full overflow-hidden border-b border-slate-100 relative bg-slate-50 group-hover:bg-slate-100/50 transition-colors">
        <ProductImage 
          product={product} 
          className="h-40 w-full transition-transform duration-500 ease-out group-hover:scale-105" 
        />
      </div>

      <CardHeader className="p-5 pb-3">
        {/* Category Metadata Ribbon */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400">
            {product.mainCategory}
          </span>
          <span className="text-[10px] font-mono text-slate-300 group-hover:text-slate-400 transition-colors">
            {product.id}
          </span>
        </div>

        {/* Product Group Name */}
        <h4 className="text-base font-bold text-slate-800 tracking-tight group-hover:text-blue-900 transition-colors leading-snug">
          {product.cleanName}
        </h4>
      </CardHeader>

      <CardContent className="p-5 pt-0 flex flex-col gap-4 flex-grow">
        {/* Subcategory Badge */}
        <div className="flex flex-wrap gap-1">
          <Badge variant="blue" className="text-[11px] font-medium tracking-wide py-0.5 px-2 bg-blue-50 border-blue-200/50 text-blue-800">
            {product.subcategory}
          </Badge>
        </div>

        {/* Variations (if any) */}
        {product.variations && product.variations.length > 0 && (
          <div className="space-y-1.5 mt-auto">
            <span className="text-[10px] font-semibold text-slate-400 tracking-wide block uppercase">
              Variations / Specifications:
            </span>
            <div className="flex flex-wrap gap-1">
              {product.variations.map((variation, idx) => (
                <Badge 
                  key={idx} 
                  variant="slate" 
                  className="text-[10px] font-normal tracking-normal py-0 px-1.5 bg-slate-50 border-slate-200/70 text-slate-600"
                >
                  {variation}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
