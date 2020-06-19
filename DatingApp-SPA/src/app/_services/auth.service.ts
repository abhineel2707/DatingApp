import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// we need to decorate services with @Injectable because they aren't automatically injectable like components
// in this case the services is being provided to the root which in our case is app.module.ts
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'http://localhost:5000/api/auth/';
  constructor(private httpClient: HttpClient) {}

  login(model: any) {
    return this.httpClient.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  register(model: any) {
    return this.httpClient.post(this.baseUrl + 'register', model);
  }
}
