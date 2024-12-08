import ManufacturerResponse from './ManufacturerResponse';
import ProductImageResponse from './ProductImageResponse';

export default interface ProductResponse {
  id: number;
  name: string;
  description: string;
  categoryId: number;
  categoryName: string;
  categoryDescription: string | null;
  isActive: boolean;
  images: ProductImageResponse[];
  activeSubstance: string;
  manufacturer: ManufacturerResponse;
}
