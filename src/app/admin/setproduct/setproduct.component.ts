import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { BackendService } from "./../../services/backend.service";
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-setproduct',
  templateUrl: './setproduct.component.html',
  styleUrls: ['./setproduct.component.css']
})
export class SetproductComponent implements OnInit, OnDestroy {

  toggleField: string;
  dataSource: MatTableDataSource<any>;
  members: any[];
  myDocData: any;

  savedChanges = false;
  error: boolean = false;
  errorMessage: string = "";
  dataLoading: boolean = false;
  private querySubscription;

  profileUrl: Observable<string | null>
  takeHostSelfie = false;
  showHostSelfie = false;
  myDocId;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns = ['category', 'scategory', 'name', 'price', '_id'];

  constructor(private _backendService: BackendService, private _storage: AngularFireStorage) { }

  ngOnInit() {
    this.toggleField = "searchMode";
    this.dataSource = new MatTableDataSource(this.members);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  toggle(filter?) {
    if (!filter) { filter = "searchMode" }
    else { filter = filter; }
    this.toggleField = filter;
  }

  getData() {
    this.dataLoading = true;
    this.querySubscription = this._backendService.getProducts('product').subscribe(members => {
      this.members = members;
      this.dataSource = new MatTableDataSource(members);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      (error) => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      },
      () => {
        this.error = false;
        this.dataLoading = false;
      });
  }

  getFilterData(filtres) {
    this.dataLoading = true;
    this.querySubscription = this._backendService.getProducts('product', filtres).subscribe(members => {
      this.members = members;
      this.dataSource = new MatTableDataSource(members);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
      (error) => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      },
      () => {
        this.error = false;
        this.dataLoading = false;
      });
  }

  setData(formData) {
    this.dataLoading = true;
    this.querySubscription = this._backendService.setProducts('product', formData)
      .then((res) => {
        this.savedChanges = true;
        this.dataLoading = false;
      }).catch(error => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      });
  }

  updateData(formData) {
    this.dataLoading = true;
    this.querySubscription = this._backendService.updateProducts('product', formData)
      .then((res) => {
        this.savedChanges = true;
        this.dataLoading = false;
      }).catch(error => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      });

  }

  getDoc(docId) {
    this.dataLoading = true;
    this.querySubscription = this._backendService.getOneProduct('product', docId)
    .subscribe(res => {
      if (res) {
        this.myDocData = res;
        this.toggle('editMode');
        this.dataLoading = false;
      }
    },
      (error) => {
        this.error = true;
        this.errorMessage = error.message;
        this.dataLoading = false;
      },
      () => {
        this.error = false;
        this.dataLoading = false;
      });
  }

  deleteDoc(docId) {
    if (confirm("Are you sure you want to delete this?")) {
        this.dataLoading = true;
        this.querySubscription = this._backendService.delOneProductDoc('product', docId)
          .then((res) => {
            this.savedChanges = true;
            this.dataLoading = false;
          }).catch(error => {
            this.error = true;
            this.errorMessage = error.message;
            this.dataLoading = false;
          });
        
    }
  }

  //Picture functions
  getPic(picId) {
    const ref = this._storage.ref(picId);
    this.profileUrl = ref.getDownloadURL();
  }

  deleteProductPic(docId) {
    if (confirm("Are you sure you want to delete this picture?")) {
      this._backendService.deleteProductPic('product',docId);
    }
  }

  // function for data table -resaults view
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }
  }

}
