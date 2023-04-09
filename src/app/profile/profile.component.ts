import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { AuthService } from '../2.Services/auth.service';
import { StoreService } from '../2.Services/store.service';
import { FileUploadService } from '../2.Services/file-upload.service';
import { Store } from '../1.Shared/store';
import { Observable } from 'rxjs';

interface User {
  _id: string, img: string, username: string, phone: string, email: string, seller?: boolean
};
interface editedUser {
  img?: string, username?: string, phone?: string, email?: string, seller?: boolean
};
interface createdStore {
  img: string, name: string, owner?: string, ownerId?: string, type: string, phone: string, fbsrc: string, categories: string[], description: string
};
interface selectedFile {
  selectedFiles?: FileList, currentFile?: File, progress?: number, message?: string, preview?: string
};

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = { _id: '', img: '', username: '', phone: '', email: '' };
  editedUser: editedUser = { img: '', username: '', phone: '', email: '' };
  userSrcImg!: string;
  success: boolean = false;
  errMssg!: string;
  changeUsernameErrMssg!: string;
  changePhoneErrMssg!: string;
  changeEmailErrMssg!: string;

  progress!: number;
  uploadErrMssg: string;

  myStore: Store;
  createdStore: createdStore = { img: 'assets/img/stores/constructions-3.jpg', name: '', type: '', phone: '', fbsrc: '', categories: [], description: '...' };
  storeSrcImg!: string;
  cat!: string;
  ShowFormCS: boolean = false;
  successCS: boolean = false;
  edit: boolean = false;
  deleteCS: boolean = false;
  errMssgCS!: string;

  uploadForm: FormGroup;

  constructor(@Inject('BaseURL') public baseURL: any,
    private AuthSrv: AuthService,
    private storeSrv: StoreService,
    private uploadSrv: FileUploadService,
    public fb: FormBuilder) {
    this.uploadForm = this.fb.group({
      avatar: [null]
    });
  }

  ngOnInit() {
    this.AuthSrv.getUser(this.AuthSrv.getUsername())
      .subscribe((user) => {
        this.user = user;
        this.userSrcImg = `${this.baseURL}${user.img}`;
        console.log(user.img)
        if (this.user.seller == true) {
          this.storeSrv.getStoreByOwner(user._id)
            .subscribe((store) => { this.myStore = store[0]; this.ShowFormCS = false; }, (errMssg) => this.errMssgCS = errMssg)
        } else { this.ShowFormCS = true }
      }, (errMssg) => this.errMssg = <any>errMssg);
  }

  /* Profile details */
  StoreOwner(): string {
    if (this.user.seller == false) {
      this.storeSrcImg = `${this.baseURL}${this.createdStore.img}`;
      return 'Don\'t have any store';
    }
    else {
      return this.myStore.name;
    };
  }
  /* End Profile details */

  /* Profile edit */
  /* Upload userImg */
  selectUserImg(event: any): void {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({ avatar: file });
    this.uploadForm.get('avatar').updateValueAndValidity()
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.userSrcImg = reader.result as string;
      reader.readAsDataURL(file);
      setTimeout(() => {
        this.UploadUserImg();
      }, 3000);
    }
  }

  UploadUserImg(): void {
    this.progress = 0;
    if (this.uploadForm.value.avatar !== null) {
      this.uploadSrv.upload(this.uploadForm.value.avatar, 'users')
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log('User successfully created!', event.body);
              this.editedUser.img = `assets/img/users/${event.body.filename}`;
              setTimeout(() => {
                this.progress = 0;
              }, 1000);
          }
        });
    }
  }

  /* Update user info */
  onSubmit() {
    if (this.editedUser.img == this.user.img || this.editedUser.img == '') delete this.editedUser.img;

    if (this.editedUser.username == this.user.username || this.editedUser.username == '') delete this.editedUser.username;
    else if (this.editedUser.username) {
      this.AuthSrv.usernameChange(this.editedUser.username)
        .subscribe((res) => {
          if (res.success == false) {
            this.changeUsernameErrMssg = res.status;
          }
        }, (changeUsernameErrMssg) => this.changeUsernameErrMssg = changeUsernameErrMssg);
    }

    if (this.editedUser.email == this.user.email || this.editedUser.email == '') delete this.editedUser.email;
    else if (this.editedUser.email) {
      this.AuthSrv.emailChange(this.editedUser.email)
        .subscribe((res) => {
          if (res.success == false) {
            this.changeEmailErrMssg = res.status;
          }
        }, (changeEmailErrMssg) => this.changeEmailErrMssg = changeEmailErrMssg);
    }

    if (this.editedUser.phone == this.user.phone || this.editedUser.phone == '') delete this.editedUser.phone;
    else if (this.editedUser.phone) {
      this.AuthSrv.phoneChange(this.editedUser.phone)
        .subscribe((res) => {
          if (res.success == false) {
            this.changePhoneErrMssg = res.status;
          }
        }, (changePhoneErrMssg) => this.changePhoneErrMssg = changePhoneErrMssg);
    }

    if (this.editedUser.seller == this.user.seller) delete this.editedUser.seller;

    if (this.editedUser.username || this.editedUser.email || this.editedUser.phone || this.editedUser.seller || this.editedUser.img) {
      if (!this.changeUsernameErrMssg || !this.changePhoneErrMssg || !this.changeEmailErrMssg) {
        this.AuthSrv.putUser(this.user._id, this.editedUser)
          .subscribe((user) => { this.user = user.user; this.success = true; }, (errMssg) => this.errMssg = errMssg);
        setTimeout(() => { window.location.reload(); }, 5000);
      }
    }
  }

  deleteUser() {
    this.AuthSrv.deleteUser(this.user._id)
      .subscribe(() => {this.AuthSrv.logOut(); setTimeout(() => { window.location.reload() }, 3000); },err => this.errMssg = err);
  }
  /* End Profile edit */

  /* Creat Store */
  selectSroreImg(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({ avatar: file });
    this.uploadForm.get('avatar').updateValueAndValidity()
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.storeSrcImg = reader.result as string;
      reader.readAsDataURL(file);
      setTimeout(() => {
        this.UploadStoreImg();
      }, 3000);
    }
  }

  UploadStoreImg(): void {
    this.progress = 0;
    if (this.uploadForm.value.avatar !== null) {
      this.uploadSrv.upload(this.uploadForm.value.avatar, 'stores')
        .subscribe((event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log('User successfully created!', event.body);
              this.createdStore.img = `assets/img/stores/${event.body.filename}`;
              setTimeout(() => {
                this.progress = 0;
              }, 1000);
          }
        });
    }
  }

  addToCategory(categ: string) {
    this.createdStore.categories?.push(categ);
    this.cat = '';
  }
  removeCategory(category: string) {
    const index = this.createdStore.categories.indexOf(category);
    if (index !== -1) this.createdStore.categories.splice(index, 1);
  }

  CreatStore() {
    this.createdStore.owner = this.user.username;
    this.createdStore.ownerId = this.user._id;
    this.storeSrv.postStores(this.createdStore)
      .subscribe((store) => {
        this.myStore = store;
        this.successCS = true;
        setTimeout(() => {
          this.AuthSrv.putUser(this.user._id, { seller: true }).subscribe(() => window.location.reload(), (errMssg) => this.errMssgCS = errMssg);
        }, 3000);
      }, (errMssg) => this.errMssgCS = errMssg);
  }
  /* End Creat Store */
  /* Edit Store */
  onCancel() {
    this.edit == false;
    this.ShowFormCS = false;
  }
  onEdit() {
    this.createdStore.categories = this.myStore.categories;
    this.createdStore.description = this.myStore.description;
    this.createdStore.fbsrc = this.myStore.fbsrc;
    this.createdStore.img = this.myStore.img;
    this.createdStore.name = this.myStore.name;
    this.createdStore.type = this.myStore.type;
    this.createdStore.phone = this.myStore.phone;
    this.storeSrcImg = `${this.baseURL + this.myStore.img}`;
    this.edit = true;
    this.ShowFormCS = true;
  }
  editStore() {
    this.storeSrv.putStore(this.myStore._id, this.createdStore)
      .subscribe((store) => {
        this.myStore = store;
        this.onCancel();
      }, (errMssg) => this.errMssgCS = errMssg);
  }
  deletestore(): void {
    this.storeSrv.deleteStore(this.myStore._id).subscribe(() => {
      this.AuthSrv.putUser(this.user._id, { seller: false }).subscribe(() => {
        this.deleteCS = true;
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
    }, (errMssg) => this.errMssgCS = errMssg)
  }
  /* End Edit Store */
}
