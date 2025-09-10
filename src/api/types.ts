type StrapiBase = {
  id: number;
  documentId: string;
};

type Meta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};

type StrapiImage = StrapiBase & {
  url: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  previewUrl: string;
  provider: string;
};

export type Ingredient = {
  id: number;
  name: string;
  amount: number;
  unit: string;
};

export type RecipeCategory = StrapiBase & {
  title: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type Recipe = StrapiBase & {
  name: string;
  totalTime: number;
  cookingTime: number;
  preparationTime: number;
  servings: number;
  likes: number;
  calories: number;
  rating: number;
  summary: string;
  vegetarian: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  // при добавлении соответствующих query params
  images: StrapiImage[];
  ingradients: Ingredient[];
  category: RecipeCategory;
};

export type ApiResponse<T> = {
  data: T[];
  meta: Meta;
};
