import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RecipeService } from 'src/services/recipe.service';
import { Recipe } from 'src/shared/models/recipe.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RecipeListComponent } from './recipe-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let configService: RecipeService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipeListComponent],
      providers: [RecipeService], 
      imports: [HttpClientTestingModule , MatFormFieldModule , FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
    component = fixture.componentInstance;
    configService = TestBed.inject(RecipeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set recipes, filteredRecipes, and call loadMyRecipes() on successful getRecipes()', () => {
    const mockRecipes: Recipe[] = [
      {
        id: 2,
        name: 'Chicken Stir Fry',
        description: 'Healthy chicken and vegetable stir fry',
        ingredients: ['chicken', 'vegetables'],
        instructions: 'Lorem ipsum dolor sit amet...',
        imageURL: '../../assets/images/chiken.jpg',
        saved: false,
      },
    ];
    const recipeService = TestBed.inject(RecipeService);
    spyOn(recipeService, 'getRecipes').and.returnValue(of(mockRecipes));

    component.getRecipes();

    expect(component.recipes).toEqual(mockRecipes);
    expect(component.filteredRecipes).toEqual(mockRecipes);
    expect(component.loading).toBeFalse();
    expect(component.loadMyRecipes).toHaveBeenCalled();
  });

  it('should set error to true on error in getRecipes()', () => {
    const recipeService = TestBed.inject(RecipeService);
    spyOn(recipeService, 'getRecipes').and.returnValue(throwError('Error'));

    component.getRecipes();

    expect(component.error).toBeTrue();
    expect(component.loading).toBeFalse();
  });
});
