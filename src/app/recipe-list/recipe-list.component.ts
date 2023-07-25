import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../shared/models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  error: boolean = false;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.getRecipes();
    this.loadMyRecipes();
  }

  getRecipes() {
    this.loading = true;
    this.error = false;

    this.recipeService.getRecipes().subscribe(
      (recipes) => {
        this.recipes = recipes;
        this.filteredRecipes = recipes;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching recipes:', error);
        this.loading = false;
        this.error = true;
      },
    );
  }

  filterRecipes() {
    if (this.searchQuery) {
      this.filteredRecipes = this.recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
      );
    } else {
      this.filteredRecipes = this.recipes;
    }
  }

  onSaveRecipe(recipe: Recipe) {
    if (!recipe.saved) {
      recipe.saved = true;
      this.recipeService.addToSavedRecipes(recipe);
    }
  }

  private loadMyRecipes(): void {
    this.recipeService.getsavedRecipes().subscribe((myRecipes) => {
      this.recipes.forEach((recipe) => {
        recipe.saved = myRecipes.some(
          (savedRecipe) => savedRecipe.id === recipe.id,
        );
      });
    });
  }
}
