export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string;
  imageURL: string;
  saved: boolean;
}
