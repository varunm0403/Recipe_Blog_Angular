import { Component, OnInit } from '@angular/core';
import { Country, CountryService } from 'src/app/country.service';
import { RecipeService } from 'src/app/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit {
  countries: Country[] = [];
  recipes: any[] = [];
  filteredRecipes: any[] = [];

  // Filter states
  selectedCuisine = '';
  selectedCategory = '';
  selectedDifficulty = '';
  sortBy = '';

  // Dropdown option arrays
  availableCuisines: string[] = [];
  availableCategories: string[] = [];
  availableDifficulties: string[] = [];

  constructor(
    private countryService: CountryService,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    // Load countries (for cuisine circle buttons)
    this.countryService.getCountries().subscribe((data: Country[]) => {
      this.countries = data;
    });

    // Load all recipes
    this.recipeService.getRecipes().subscribe((data: any[]) => {
      this.recipes = data;
      this.filteredRecipes = [...data];

      // Extract unique options for dropdowns
      this.availableCuisines = [...new Set(data.map(r => r.cuisine))];
      this.availableCategories = [...new Set(data.map(r => r.category))];
      this.availableDifficulties = [...new Set(data.map(r => r.difficulty))];
    });
  }

  applyFilters(): void {
    this.filteredRecipes = this.recipes.filter(recipe => {
      return (
        (!this.selectedCuisine || recipe.cuisine === this.selectedCuisine) &&
        (!this.selectedCategory || recipe.category === this.selectedCategory) &&
        (!this.selectedDifficulty || recipe.difficulty === this.selectedDifficulty)
      );
    });

    if (this.sortBy === 'latest') {
      this.filteredRecipes = [...this.filteredRecipes].reverse(); // Assuming order of addition represents "latest"
    } else if (this.sortBy === 'popular') {
      this.filteredRecipes = [...this.filteredRecipes].sort((a, b) => b.rating - a.rating);
    }
  }

  // Optional: Trigger filtering whenever any dropdown changes (can also use (change)="applyFilters()" in template)
  onFilterChange(): void {
    this.applyFilters();
  }
}
