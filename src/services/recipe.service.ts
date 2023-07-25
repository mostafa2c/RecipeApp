import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Recipe } from '../shared/models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipesUrl = 'assets/recipes.json';
  private savedRecipes: Recipe[] = [];
  private savedRecipesCountSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    this.loadMyRecipes();
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl);
  }

  getsavedRecipes(): Observable<Recipe[]> {
    return of(this.savedRecipes);
  }

  addToSavedRecipes(recipe: Recipe) {
    const existingRecipe = this.savedRecipes.find((r) => r.id === recipe.id);
    if (!existingRecipe) {
      this.savedRecipes.push(recipe);
      this.setToLocalStorage(this.savedRecipes);
      this.savedRecipesCountSubject.next(this.savedRecipes.length); // Notify subscribers about the count change
    }
  }

  removeFromSavedRecipes(recipe: Recipe) {
    this.savedRecipes = this.savedRecipes.filter((r) => r.id !== recipe.id);
    localStorage.setItem('myRecipes', JSON.stringify(this.savedRecipes));
    this.savedRecipesCountSubject.next(this.savedRecipes.length);
  }

  getSavedRecipesCount(): Observable<number> {
    return this.savedRecipesCountSubject.asObservable();
  }

  loadMyRecipes() {
    this.savedRecipes = this.getFromLocalStorage();
    this.savedRecipesCountSubject.next(this.savedRecipes.length);
  }

  getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('myRecipes') || '[]');
  }

  setToLocalStorage(recipe: Recipe[]) {
    localStorage.setItem('myRecipes', JSON.stringify(recipe));
  }
}
