import { Component, OnInit } from '@angular/core';
import { Recipe } from 'src/shared/models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-my-recipes',
  templateUrl: './my-recipes.component.html',
  styleUrls: ['./my-recipes.component.scss'],
})
export class MyRecipesComponent implements OnInit {
  savedRecipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.loadMyRecipes();
  }

  loadMyRecipes(): void {
    this.recipeService.getsavedRecipes().subscribe((recipes) => {
      this.savedRecipes = recipes;
    });
  }

  onRemoveRecipe(recipe: any): void {
    this.recipeService.removeFromSavedRecipes(recipe);
    this.loadMyRecipes();
  }
}
