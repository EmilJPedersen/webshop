import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(public afAuth: AngularFireAuth) { }

  getConfig() {
    return environment.social;
  }

  login(loginType, formData?) {
    //this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    if (formData) {
      return this.afAuth.auth.signInWithEmailAndPassword(formData.email, formData.password);
    } 
    else {
      let loginMethod;
      if (loginType == 'GOOGLE') { loginMethod = new firebase.auth.GoogleAuthProvider(); }
      return this.afAuth.auth.signInWithRedirect(loginMethod);
    }
  }

  redirectLogin() {
    return this.afAuth.auth.getRedirectResult();
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  isUserLoggedin() {
    return this.afAuth.authState;
  }


  //fake funktions for testing
  getCartTotal() {
    let fakereponse = "10";
    return Observable.create(
      observer => {
        setTimeout(() => {
          observer.next(fakereponse)
        }, 2000)
      }
    )
  }

  getUserStatus() {
    let fakereponse = true;
    return Observable.create(
      observer => {
        setTimeout(() => {
          observer.next(fakereponse)
        }, 1000)
      }
    )
  }

  getProducts(collType) {
    let fakereponse = [{
      'category': "Test",
      'scategory': "Test",
      'name': "Product name",
      'price': "100",
      '_id': "420"
    }];
    return Observable.create(
      observer => {
        setTimeout(() => {
          observer.next(fakereponse)
        }, 1000)
      }
    )
  }

  getFilterProducts(collType, filtres) {
    let fakereponse = [{
      'category': "Test",
      'scategory': "Test",
      'name': "Product name",
      'price': "100",
      '_id': "420"
    }];
    return Observable.create(
      observer => {
        setTimeout(() => {
          observer.next(fakereponse)
        }, 1000)
      }
    )
  }

  setProducts(collType, filtres) {
    let fakereponse = true;
    return Observable.create(
      observer => {
        setTimeout(() => {
          observer.next(fakereponse)
        }, 1000)
      }
    )
  }

  updateProducts(collType, filtres) {
    let fakereponse = true;
    return Observable.create(
      observer => {
        setTimeout(() => {
          observer.next(fakereponse)
        }, 1000)
      }
    )
  }

  getOneProductDoc(collType, docId) {
    let fakereponse = {
      'category': "Test",
      'scategory': "Test",
      'name': "Product name",
      'price': "100",
      '_id': "420"
    };
    return Observable.create(
      observer => {
        setTimeout(() => {
          observer.next(fakereponse)
        }, 1000)
      }
    )
  }

  delOneProductDoc(collType, docId) {
    let fakereponse = true;
    return Observable.create(
      observer => {
        setTimeout(() => {
          observer.next(fakereponse)
        }, 1000)
      }
    )
  }

  updateShoppingInterest(collType, data) {
    let fakereponse = true;
    return Observable.create(
      observer => {
        setTimeout(() => {
          observer.next(fakereponse)
        }, 1000)
      }
    )
  }

  updateShoppingCart(collType, data) {
    let fakereponse = true;
    return Observable.create(
      observer => {
        setTimeout(() => {
          observer.next(fakereponse)
        }, 1000)
      }
    )
  }
}
