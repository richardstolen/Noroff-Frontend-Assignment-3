import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.page.html',
  styleUrls: ['./trainer.page.css'],
})
export class TrainerPage {

  public _user?;

  constructor(
    private readonly userService: UserService,
    private readonly router: Router) {
    this._user = userService.user;
  }

  logOutClick(): void {
    this.userService.user = undefined;
    this.router.navigateByUrl('/login');
  }
}
