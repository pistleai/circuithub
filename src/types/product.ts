export interface Product {
  id: string;
  name: string;          // Original raw product group/type name
  cleanName: string;     // Product name stripped of parentheses/variations
  mainCategory: string;  // Level 1 Category
  subcategory: string;   // Level 2 Category
  variations?: string[]; // Extracted variations (e.g. from parentheses)
  image?: string;        // Optional specific image override path
}
