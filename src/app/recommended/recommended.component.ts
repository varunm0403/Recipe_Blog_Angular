import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css'],
  standalone : false
})
export class RecommendedComponent implements OnInit {
  recipes: any[] = [];
  filteredRecipes: any[] = [];

  selectedCuisine: string = '';
  selectedCategory: string = '';
  selectedCookingTime: string = '';
  selectedDifficulty: string = '';

  availableCuisines: string[] = [];
  availableCategories: string[] = [];
  availableDifficulties: string[] = [];

  constructor(private recipeService: RecipeService,
    private cdr: ChangeDetectorRef
  ) {} // ✅ inject here

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((data: any[]) => {
      this.recipes = data;
      this.filteredRecipes = [...data];

      this.availableCuisines = [...new Set(data.map(r => r.cuisine))];
      this.availableCategories = [...new Set(data.map(r => r.category))];
      this.availableDifficulties = [...new Set(data.map(r => r.difficulty))];
      this.cdr.detectChanges(); // Trigger change detection to update the view
    });
  }

  applyFilters(): void {
    this.filteredRecipes = this.recipes.filter(recipe => {
      return (
        (!this.selectedCuisine || recipe.cuisine === this.selectedCuisine) &&
        (!this.selectedCategory || recipe.category === this.selectedCategory) &&
        (!this.selectedDifficulty || recipe.difficulty === this.selectedDifficulty) &&
        (!this.selectedCookingTime || parseInt(recipe.cookingTime) <= +this.selectedCookingTime)
      );
    });
  }
}
