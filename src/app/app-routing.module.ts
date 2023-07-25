import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyRecipesComponent } from './my-recipes/my-recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipeListComponent, pathMatch: 'full' },
  { path: 'my-recipes', component: MyRecipesComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
