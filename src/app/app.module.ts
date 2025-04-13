import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronRight, View } from 'lucide-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { SubmitRecipeComponent } from './submit-recipe/submit-recipe.component';
import { ViewRecipeComponent } from './view-recipe/view-recipe.component';
import { RecipeCardComponent } from './recipecard/recipecard.component';
import { FavouriteComponent } from './favourites/favourites.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    SubmitRecipeComponent,
    ViewRecipeComponent,
    FavouriteComponent,
    RecipeDetailComponent,
    RecommendedComponent,
    RecipeCardComponent,
    UserDetailComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    LucideAngularModule.pick({ ChevronRight })
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports : []
})
export class AppModule { 


}
