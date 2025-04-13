import { Component , OnInit} from '@angular/core';
import { ViewUsersService} from '../view-users.service';
import { Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [CommonModule, RouterModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  users : any[] = [];
  user : any;

  constructor(private viewUsersService : ViewUsersService,
              private http : HttpClient,
            private router : Router){}
  
  ngOnInit():void{

    this.viewUsersService.getUsers().subscribe((data : any) => {
      this.users = data;
    })
  }

  showUsers(id: string): void {
  this.viewUsersService.getUserById(id).subscribe((data: any[]) => {
    this.user = data[0]; // because it's an array
  });
}

  viewUserDetails(user: any) {
    this.router.navigate(['/user', user.id]);
  }

}
