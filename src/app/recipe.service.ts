import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) {}

  submitRecipe(recipeData: any): Observable<any> {
    return this.http.post(this.baseUrl, recipeData);
  }

  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getRecipeById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getRecipesByUserId(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3000/recipes?userId=${userId}`);
  }
  


  deleteRecipe(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/recipes/${id}`);
  }  
  
}
