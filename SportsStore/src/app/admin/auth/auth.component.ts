import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/model/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  public username: string;
  public password: string;
  public errorMessage: string;

  public authForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private auth: AuthService, private snackBar: MatSnackBar) {}

  authenticate() {
    if (this.authForm.valid) {
      // Perform authentication
      this.auth.authenticate(this.authForm.controls.username.value, this.authForm.controls.password.value)
        .subscribe(response => {
          if(response) {
            this.router.navigateByUrl("/admin/main");
          } else {
            this.errorMessage = "Authentication Failed";
            this.snackBar.open(this.errorMessage, "", { duration: 2000 });
          }
        });
    } else {
      this.errorMessage = "Form Data Invalid";
      this.snackBar.open(this.errorMessage, "", { duration: 2000 });
    }
  }

  getErrorMessage(fc: FormControl): string {
    let msg = "Enter a proper value for this field"
    if (fc.hasError('required')) {
      msg = 'You must enter a value';
    } else if (fc.hasError('email')) {
      msg = 'Not a valid email';
    }
    return msg;
  }
}
