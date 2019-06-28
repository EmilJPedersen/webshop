import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor() { }

  getConfig(){
    return environment.social;
  }

  getCartTotal(){
    let fakereponse ="10";
    return Observable.create(
      observer => {
        setTimeout(() => {
          observer.next(fakereponse)
        }, 2000)
      }
    )
  }

  getUserStatus(){
    let fakereponse = true;
    return Observable.create(
      observer => {
        setTimeout(() => {
          observer.next(fakereponse)
        }, 2000)
      }
    )
  }
}
