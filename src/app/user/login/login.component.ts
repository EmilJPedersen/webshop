import { Component, OnInit } from '@angular/core';
import { BackendService } from './../../services/backend.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userloggedin: boolean = true;
  error: boolean = false;
  errorMessage: string = "";
  dataLoading: boolean = false;

  constructor(private _backendService: BackendService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
    //this.userloggedin = false;
    this.getAuthStatus();
  }

  login(loginType, formData?) {
    this.dataLoading = true;
    return this._backendService.login(loginType, formData).catch(
      (err) => {
        this.error = true;
        this.errorMessage = err.errorMessage;
        console.log(err);
        this.userloggedin = false;
        this.dataLoading = false;
      }
    )
  }

  logout() {
    this.dataLoading = true;
    return this._backendService.logout().then((success) =>
    {
      this.userloggedin = false;
      this.dataLoading = false;
    });
  }

  getAuthStatus() {
    this.dataLoading = true;
    this._backendService.redirectLogin().then(function(resault) {
      if(resault.credential) {
        console.log(resault.credential);
        if (resault.credential["accessToken"] != "") {
          return this.userloggedin = true;
        }
        this.dataLoading = false;
      }
    }).catch(
      (err) => {
        this.error = true;
        this.errorMessage = err.errorMessage;
        console.log(err);
        this.userloggedin = false;
        this.dataLoading = false;
      }
    );
    this.dataLoading = false;
  }

}
