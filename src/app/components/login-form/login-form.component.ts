import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model'
import { LoginService } from 'src/app/services/login.service'
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  @Output() login: EventEmitter<void> = new EventEmitter();

  // Dependency injection
  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService,
    ) { }

  public loginSubmit(loginForm: NgForm): void {

    const { username } = loginForm.value;
    
    this.loginService.login(username)
      .subscribe({
        next: (user: User) => {
          // Store newly selected user
          this.userService.user = user;
          
          // Let the parent element (the login page in this case) know that the user is being logged in,
          // so that it can take appropriate action, such as redirecting to a different page for instance.
          this.login.emit();
        },
        error: (error: Error) => {
          console.log("ERROR", error.message
          );
        }
      })
  }
}
