import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from './../../services/backend.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() pageTitle: string;
  @Input() iconTitle: string;
  @Input() helpTitle: string;
  configData;
  counter = 0;
  userStatusColor = "warn";

  constructor(private _backendservise: BackendService) { }

  ngOnInit() {
    this.configData = this._backendservise.getConfig();

    this._backendservise.getCartTotal().subscribe(
      (res) => {
        this.counter = res;
      }
    );

    this._backendservise.getUserStatus().subscribe(
      (res) => {
        this.userStatusColor = res ? "primary" : "warn";
      }
    );
  }

}
