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
        }, 1000)
      }
    )
  }

  getProducts(collType){
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

  getFilterProducts(collType, filtres){
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

  setProducts(collType, filtres){
    let fakereponse = true;
    return Observable.create(
      observer => {
        setTimeout(() => {
          observer.next(fakereponse)
        }, 1000)
      }
    )
  }

  updateProducts(collType, filtres){
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
