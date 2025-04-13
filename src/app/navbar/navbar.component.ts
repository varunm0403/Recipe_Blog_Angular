import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone : false
})
export class NavbarComponent implements OnInit {

navigateToSubmitRecipe() {
  this.router.navigate(['/submit-recipe']);
}

navigateToViewRecipe(){
  this.router.navigate(['/view-recipe']);
}

navigateToFavorite(){
  this.router.navigate(['/favourites']);
}

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    if (!target.closest('aside') && !target.closest('button')) {
      this.isMenuOpen = false;
    }
  }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.isLoggedIn = true;
      this.loggedInUserEmail = user.email;
      this.loggedInUserFirstName = user.firstName;
    }
  }
  

  isLoggedIn : boolean= false;
  showAuthPopup : boolean = false;
  showLoginForm : boolean = true;
  loggedInUserEmail: string = '';
  loggedInUserFirstName: string = '';


  formData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    retypePassword: '',
    country: '',
    favoriteRecipes : []
  };

  constructor(private http: HttpClient,
    private router: Router
  ){}

  toggleAuthPopup() {
    this.showAuthPopup = !this.showAuthPopup;
    this.showLoginForm = true;
  }

  switchToRegister() {
    this.showLoginForm = false;
  }

  switchToLogin() {
    this.showLoginForm = true;
  }

  closePopup() {
    this.showAuthPopup = false;
  }

  login() {
    const { email, password } = this.formData;
    this.http.get<any[]>(`http://localhost:3000/users?email=${email}&password=${password}`).subscribe(users => {
      if (users.length > 0) {
        const matchedUser = users[0];
        this.isLoggedIn = true;
        this.loggedInUserEmail = matchedUser.email;
        this.loggedInUserFirstName = matchedUser.firstName;
        this.closePopup();
  
        // ✅ Store in localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
      } else {
        alert('Invalid credentials');
      }
    });
  }
  
  register() {
    const { firstName, lastName, email, password, retypePassword, country } = this.formData;

    if (!firstName || !lastName || !email || !password || password !== retypePassword || !country) {
      alert('Please fill all fields correctly.');
      return;
    }

    // Check if user already exists
    this.http.get<any[]>(`http://localhost:3000/users?email=${email}`).subscribe(existingUsers => {
      if (existingUsers.length > 0) {
        alert('User with this email already exists!');
      } else {
        const newUser = { firstName, lastName, email, password, country };
        this.http.post('http://localhost:3000/users', newUser).subscribe(() => {
          this.isLoggedIn = false;
          this.loggedInUserEmail = email;
          this.closePopup();
          this.loggedInUserFirstName = firstName;

          const newUser = { firstName, lastName, email, password, country };
          localStorage.setItem('loggedInUser', JSON.stringify(newUser));
        });
      }
    });
  }

  logout() {
    this.isLoggedIn = false;
    this.loggedInUserEmail = '';
    this.loggedInUserFirstName = '';
    localStorage.removeItem('loggedInUser'); 
    this.router.navigate(['/']);
  }

  navigateToRecommendedRecipe(){
    this.router.navigate(['/recommended']);
  }

  navigateToUsers(){
    this.router.navigate(['/users']);
  }
}

