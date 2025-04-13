import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipecard.component.html',
  styleUrls: ['./recipecard.component.css'],
  standalone: false
})
export class RecipeCardComponent {
  @Input() recipe: any;
  @Input() isFavorite: boolean = false;
  @Output() favoriteToggled = new EventEmitter<number>();
  constructor(private router: Router) {}


  toggleFavorite(): void {
    this.favoriteToggled.emit(this.recipe.id);
  }
  
  goToRecipeDetail() {
    if (this.recipe && this.recipe.id) {
      this.router.navigate(['/recipe', this.recipe.id]);
    }
  }
}
