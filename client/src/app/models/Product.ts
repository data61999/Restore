export interface Product {
  id: number;
  name: string;
  description: string;
  pictureUrl: string;
  price: number;
  type: string;
  brand: string;
  quantityInStock: number;
}

export interface ProductParams {
  orderBy: string;
  searchTerm?: string;
  brands: string[];
  types: string[];
  pageNumber: number;
  pageSize: number;
}
