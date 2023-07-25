import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/services/recipe.service';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.scss'],
})
export class TopHeaderComponent implements OnInit {
  savedRecipesCount: number = 0;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.updateSavedRecipesCount();
  }

  updateSavedRecipesCount() {
    this.recipeService.getSavedRecipesCount().subscribe((count) => {
      this.savedRecipesCount = count;
    });
  }
}
