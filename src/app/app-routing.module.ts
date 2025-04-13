import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubmitRecipeComponent } from './submit-recipe/submit-recipe.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { FavouriteComponent } from './favourites/favourites.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  {path:'', component : HomeComponent},
  { path: 'submit-recipe', component: SubmitRecipeComponent },
  { path : 'view-recipe', component : ViewRecipeComponent},
  { path : 'favourites', component : FavouriteComponent},
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path :'recommended', component : RecommendedComponent},
  {path : 'users', component : UsersComponent},
  { path: 'user/:id', component: UserDetailComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
