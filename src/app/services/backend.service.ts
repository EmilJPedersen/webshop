import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { filter } from 'minimatch';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private itemCollection: AngularFirestoreCollection<any>;
  private itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) { }

  getConfig() {
    return environment.social;
  }

  login(loginType, formData?) {
    let loginMethod;
    
    loginMethod = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithRedirect(loginMethod);
    //this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    /*if (formData) {
      return this.afAuth.auth.signInWithEmailAndPassword(formData.email, formData.password);
    }
    else {
      let loginMethod;
      if (loginType == 'GOOGLE') { loginMethod = new firebase.auth.GoogleAuthProvider(); }
      return this.afAuth.auth.signInWithRedirect(loginMethod);
    }*/
  }

  redirectLogin() {
    return this.afAuth.auth.getRedirectResult();
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  isUserLoggedin(): Observable<boolean> {
    return Observable.from(this.afAuth.authState)
      .take(1)
      .map(state => !!state)
      .do(authenticated => {
        return authenticated;
      });
  }

  isUserAdmin() {
    let collUrl = !this.isUserLoggedin() ? "abcd" : this.afAuth.auth.currentUser.uid;
    collUrl = "/webshop/elish/admins/" + collUrl;
    //console.log(collUrl);
    return this.getDoc(collUrl);
  }

  getDoc(collUrl: string) {
    this.itemDoc = this.afs.doc<any>(collUrl);
    console.log(this.itemDoc);
    return this.itemDoc.valueChanges();
  }

  get timestamp() {
    var d = new Date();
    return d;
  }

  getCollectionUrl(filter) {
    return "webshop/elish/" + filter;
  }

  setProducts(coll: string, data: any, docId?: any) {
    const id = this.afs.createId();
    const item = { id, name };
    const timestamp = this.timestamp;
    var docRef = this.afs.collection(this.getCollectionUrl(coll)).doc(item.id);
    return docRef.set({
      ...data,
      _id: id,
      updatedAt: timestamp,
      createdAt: timestamp,
      delete_flag: "N",
      userid: this.afAuth.auth.currentUser.uid,
      username: this.afAuth.auth.currentUser.displayName,
      useremail: this.afAuth.auth.currentUser.email
    });
  }

  getProducts(coll: string, filters?: any) {
    this.itemCollection = this.afs.collection<any>(this.getCollectionUrl(coll));
    return this.itemCollection.valueChanges();
  }

  getOneProduct(collType, docId) {
    let docUrl = this.getCollectionUrl(collType) + "/" + docId;
    this.itemDoc = this.afs.doc<any>(docUrl);
    return this.itemDoc.valueChanges();
  }

  updateProducts(coll: string, data: any, docId?: any) {
    const id = this.afs.createId();
    const item = { id, name };
    const timestamp = this.timestamp;
    var docRef = this.afs.collection(this.getCollectionUrl(coll)).doc(data._id);
    return docRef.update({
      ...data,
      _id: id,
      updatedAt: timestamp,
      userid: this.afAuth.auth.currentUser.uid,
      username: this.afAuth.auth.currentUser.displayName,
      useremail: this.afAuth.auth.currentUser.email
    });
  }

  delOneProductDoc(coll, docId) {
    const id = this.afs.createId();
    const item = { id, name };
    const timestamp = this.timestamp;
    var docRef = this.afs.collection(this.getCollectionUrl(coll)).doc(docId);
    return docRef.update({
      delete_flag: "Y",
      _id: id,
      updatedAt: timestamp,
      userid: this.afAuth.auth.currentUser.uid,
      username: this.afAuth.auth.currentUser.displayName,
      useremail: this.afAuth.auth.currentUser.email
    });
  }

  setProductPic(filePath, coll, docId?) {
    var docRef = this.afs.collection(this.getCollectionUrl(coll)).doc(docId);
    return docRef.set({
      path:filePath
    },{merge: true});
  }

  deleteProductPic(coll, docId?) {
    var docRef = this.afs.collection(this.getCollectionUrl(coll)).doc(docId);
    return docRef.set({
      path: null
    },{merge: true});
  }

  //fake funktions for testing
  // getCartTotal() {
  //   let fakereponse = "10";
  //   return Observable.create(
  //     observer => {
  //       setTimeout(() => {
  //         observer.next(fakereponse)
  //       }, 2000)
  //     }
  //   )
  // }

  // getUserStatus() {
  //   let fakereponse = true;
  //   return Observable.create(
  //     observer => {
  //       setTimeout(() => {
  //         observer.next(fakereponse)
  //       }, 1000)
  //     }
  //   )
  // }

  // getProductsFake(collType) {
  //   let fakereponse = [{
  //     'category': "Photo Editing",
  //     'scategory': "Adobe",
  //     'name': "Photoshop CS6",
  //     'price': "1500",
  //     '_id': "420",
  //     'description': "test"
  //   }];
  //   return Observable.create(
  //     observer => {
  //       setTimeout(() => {
  //         observer.next(fakereponse)
  //       }, 1000)
  //     }
  //   )
  // }

  // getFilterProducts(collType, filtres) {
  //   let fakereponse = [{
  //     'category': "Photo Editing",
  //     'scategory': "Adobe",
  //     'name': "Photoshop CS6",
  //     'price': "1500",
  //     '_id': "420"
  //   }];
  //   return Observable.create(
  //     observer => {
  //       setTimeout(() => {
  //         observer.next(fakereponse)
  //       }, 1000)
  //     }
  //   )
  // }

  // setProductsFake(collType, filtres) {
  //   let fakereponse = true;
  //   return Observable.create(
  //     observer => {
  //       setTimeout(() => {
  //         observer.next(fakereponse)
  //       }, 1000)
  //     }
  //   )
  // }

  // updateProductsFake(collType, filtres) {
  //   let fakereponse = true;
  //   return Observable.create(
  //     observer => {
  //       setTimeout(() => {
  //         observer.next(fakereponse)
  //       }, 1000)
  //     }
  //   )
  // }

  // getOneProductDocFake(collType, docId) {
  //   let fakereponse = {
  //     'category': "Test",
  //     'scategory': "Test",
  //     'name': "Product name",
  //     'price': "100",
  //     '_id': "420"
  //   };
  //   return Observable.create(
  //     observer => {
  //       setTimeout(() => {
  //         observer.next(fakereponse)
  //       }, 1000)
  //     }
  //   )
  // }

  // delOneProductDocFake(collType, docId) {
  //   let fakereponse = true;
  //   return Observable.create(
  //     observer => {
  //       setTimeout(() => {
  //         observer.next(fakereponse)
  //       }, 1000)
  //     }
  //   )
  // }

  // updateShoppingInterest(collType, data) {
  //   let fakereponse = true;
  //   return Observable.create(
  //     observer => {
  //       setTimeout(() => {
  //         observer.next(fakereponse)
  //       }, 1000)
  //     }
  //   )
  // }

  // updateShoppingCart(collType, data) {
  //   let fakereponse = true;
  //   return Observable.create(
  //     observer => {
  //       setTimeout(() => {
  //         observer.next(fakereponse)
  //       }, 1000)
  //     }
  //   )
  // }
}
