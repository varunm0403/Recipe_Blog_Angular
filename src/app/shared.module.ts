import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardComponent } from './recipecard/recipecard.component';

@NgModule({
  declarations: [RecipeCardComponent],
  imports: [CommonModule],
  exports: [RecipeCardComponent] // Export so other modules/components can use it
})
export class SharedModule {}
