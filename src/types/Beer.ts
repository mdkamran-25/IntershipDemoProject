export interface Beer {
  id: number;
  name: string;
  price: string;
  rating: {
    average: number;
    reviews: number;
  };
  image: string;
  abv: number;
  ibu: number;
  description?: string;
}