import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private firebaseAuth: AngularFireAuth, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.firebaseAuth.authState.map(result => {
      if(result) {
        return true;
      }
      this.router.navigate(['']);
      return false;
    }).first();
  }

}
