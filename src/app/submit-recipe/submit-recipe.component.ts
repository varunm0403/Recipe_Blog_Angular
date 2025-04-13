// submit-recipe.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-submit-recipe',
  templateUrl: './submit-recipe.component.html',
  standalone : false
})
export class SubmitRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  userId: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router
    , private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      const user = JSON.parse(userData);
      this.userId = user.id;
    }

    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      image: [null],
      description: ['', Validators.required],
      cuisine: ['', Validators.required],
      category: ['', Validators.required],
      tags: [''],
      ingredients: [''],
      cookingTime: ['', Validators.required],
      difficulty: ['', Validators.required],
      dietaryRestrictions: [''],
      rating : [0],
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
  
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.recipeForm.patchValue({ image: reader.result });
      };
  
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched(); // this shows all errors
      return;
    }
  
    const formData = { ...this.recipeForm.value, userId: this.userId, rating : 0 };

    this.recipeService.submitRecipe(formData).subscribe( () => {
      alert('Recipe submitted!');
      this.recipeForm.reset();
      this.router.navigate(['/submit-recipe']);
    })
  }

  onCancel(): void {
    this.recipeForm.reset();
    this.imagePreview = null;
  }
}
