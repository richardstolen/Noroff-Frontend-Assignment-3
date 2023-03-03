import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  get user(): User | undefined {
    return this.userService.user;
  }

  constructor(
    private readonly userService: UserService
  ) {}

  ngOnInit(): void {
  }

}
