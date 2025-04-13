import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private baseUrl = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) {}

  getAllRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getRecipesByUser(userId: string): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(recipes => recipes.filter(recipe => recipe.userId === userId))
    );
  }
}
