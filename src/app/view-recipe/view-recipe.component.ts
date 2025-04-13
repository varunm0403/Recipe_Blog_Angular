import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewService } from '../view.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css'],
  standalone: false
})
export class ViewRecipeComponent implements OnInit {
  userRecipes: any[] = [];
  currentUser: any;

  constructor(private http: HttpClient, private ViewService: ViewService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const userId = JSON.parse(userData).id;

      this.ViewService.getRecipesByUser(userId).subscribe(recipes => {
        this.userRecipes = recipes;
      });

      this.http.get<any>(`http://localhost:3000/users/${userId}`).subscribe(user => {
        this.currentUser = user;
      });
    }
  }

  isFavorite(recipeId: number): boolean {
    return this.currentUser?.favoriteRecipes?.includes(recipeId);
  }

  toggleFavorite(recipeId: number): void {
    const favs = this.currentUser.favoriteRecipes || [];
    const index = favs.indexOf(recipeId);

    if (index > -1) {
      favs.splice(index, 1); // remove
    } else {
      favs.push(recipeId); // add
    }

    this.http.patch(`http://localhost:3000/users/${this.currentUser.id}`, {
      favoriteRecipes: favs
    }).subscribe(() => {
      this.currentUser.favoriteRecipes = favs; // update locally
    });
  }
}
