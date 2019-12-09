import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RestDatasourceService } from './rest-datasource.service';

@Injectable()
export class AuthService {

  constructor(private ds: RestDatasourceService) { }

  authenticate(user: string, pass: string): Observable<boolean> {
    return this.ds.authenticate(user, pass);
  }

  get authenticated(): boolean {
    return this.ds.authToken != null;
  }

  clear() {
    this.ds.authToken = null;
  }
}
