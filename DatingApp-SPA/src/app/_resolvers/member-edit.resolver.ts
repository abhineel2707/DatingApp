import { Injectable } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class MemberEditResolver implements Resolve<User> {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}
  resolve(route: ActivatedRouteSnapshot): Observable<User> {
    return this.userService.getUser(+this.authService.decodedToken.nameid).pipe(
      catchError((error) => {
        this.alertify.error('Problem retrieving your data.');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }
}
