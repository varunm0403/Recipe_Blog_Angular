import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewService } from '../view.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css'],
  standalone: false
})
export class FavouriteComponent implements OnInit {
  favoriteRecipes: any[] = [];
  currentUser: any;

  constructor(private http: HttpClient, private viewService: ViewService) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const userId = JSON.parse(userData).id;

      // Get user details (including favorite recipe IDs)
      this.http.get<any>(`http://localhost:3000/users/${userId}`).subscribe(user => {
        this.currentUser = user;
        const favoriteIds = user.favoriteRecipes || [];

        // Fetch all user's recipes
        this.viewService.getRecipesByUser(userId).subscribe(allRecipes => {
          this.favoriteRecipes = allRecipes.filter(recipe => favoriteIds.includes(recipe.id));
        });
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
      this.currentUser.favoriteRecipes = favs;
      this.favoriteRecipes = this.favoriteRecipes.filter(r => favs.includes(r.id));
    });
  }
}
