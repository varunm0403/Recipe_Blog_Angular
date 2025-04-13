import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  standalone: false
})
export class RecipeDetailComponent implements OnInit {
  recipeId!: string;
  recipe: any;
  currentUser: any;
  isOwner = false;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id') || '';
    const userData = localStorage.getItem('loggedInUser');
  
    if (userData) {
      this.currentUser = JSON.parse(userData);
      console.log('Current user ID:', this.currentUser.id);
    }
  
    this.recipeService.getRecipeById(this.recipeId).subscribe(data => {
      // Convert string-based fields to arrays
      this.recipe = {
        ...data,
        ingredients: this.parseArrayField(data.ingredients),
        tags: this.parseArrayField(data.tags),
        steps: this.parseArrayField(data.steps),
      };
  
      console.log('Recipe owner ID:', this.recipe.userId);
      this.isOwner = this.currentUser && String(this.recipe.userId) === String(this.currentUser.id);
      console.log('Is owner:', this.isOwner);
      this.cdr.detectChanges();
    });
  }
  
  // Helper method to convert comma-separated strings to arrays
  private parseArrayField(field: any): string[] {
    return typeof field === 'string'
      ? field.split(',').map(item => item.trim()).filter(item => item)
      : [];
  }

  deleteRecipe(): void {
    if (!this.isOwner) return;

    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(this.recipeId).subscribe(() => {
        alert('Recipe deleted successfully!');
        this.router.navigate(['/view-recipe']);
      });
    }
  }
}
