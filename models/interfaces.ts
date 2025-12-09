export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: Rating;
}
