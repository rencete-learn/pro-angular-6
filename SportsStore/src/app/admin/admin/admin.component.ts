import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../model/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private router: Router, private auth: AuthService) { }

  logout() {
    this.auth.clear();
    this.router.navigateByUrl("/");
  }

}
