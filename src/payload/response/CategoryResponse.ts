interface CategoryResponse {
  id: number;
  name: string;
  parentCategoryId: number;
  categoryType: string;
  description: string;
  imageUrl: null;
  isActive: true;
  children: [];
}
export default CategoryResponse;
