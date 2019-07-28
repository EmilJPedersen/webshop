import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {

  constructor(private _backendService: BackendService) { }

  canActivate(): Observable<boolean> {
    console.log("test");
    return this._backendService.isUserAdmin()
    .take(1)
    .map(res =>{
      if(res) {
        console.log("test1");
        return res.isadmin;
      } else {
        console.log("test2");
        return false;
      }
    })
    .do(isadmin => {
      console.log(isadmin);
      return true;
    });
  }
}
