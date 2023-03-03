import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/enums/storage-keys.enum';
import { StorageUtil } from 'src/app/utils/storage.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {
  constructor(private readonly router: Router) {}

  handleLogin(): void {
    this.router.navigateByUrl('/pokemon');
  }

  ngOnInit(): void {
    // Redirecting if user is already logged in
    if (StorageUtil.storageRead(StorageKeys.User)) {
      this.router.navigateByUrl('/pokemon');
    }
  }
}
