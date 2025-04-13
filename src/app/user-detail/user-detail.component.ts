import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewUsersService } from 'src/app/view-users.service';
import { RecipeService } from 'src/app/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  standalone:false
})
export class UserDetailComponent implements OnInit {
  userId: string = '';
  user: any;
  recipes: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userService: ViewUsersService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id')!;
    this.userService.getUserById(this.userId).subscribe(data => {
      this.user = data[0];
    });
    this.recipeService.getRecipesByUserId(this.userId).subscribe(data => this.recipes = data); // ✅ use the new method
  }
  
  
}
