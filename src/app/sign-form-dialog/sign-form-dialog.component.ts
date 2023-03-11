import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../2.Services/auth.service';


@Component({
  selector: 'app-sign-form-dialog',
  templateUrl: './sign-form-dialog.component.html',
  styleUrls: ['./sign-form-dialog.component.css']
})

export class SFDComponent implements OnInit {
  @ViewChild('btnClose') btnClose: any;
  user = {username: '', password: ''};
  createdUser = {username: '', password: '', email: '', phone: ''};
  errMess!: string;
  SignupErrMess!: string;
  @Output() login = new EventEmitter<void>();

  constructor(private authService: AuthService) {};

  ngOnInit() {
  }

  onSubmit() {
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res) {
          this.authService.loadUserCredentials();
          this.login.emit();
          this.btnClose.nativeElement.click();
        } else {
          console.log(res);
        }
      },
      errMess => {
        console.log(errMess);
        this.errMess = "The username or password is incorect ";
      });
  }

  onSignup() {
    this.authService.signUp(this.createdUser)
    .subscribe(res => {
      if (res.success == true) {
        this.user.username = this.createdUser.username;
        this.user.password = this.createdUser.password;
      } else {
        this.SignupErrMess = res.status;
      }
    }, SignupErrMess => {
      console.log(SignupErrMess);
      this.SignupErrMess = <any>SignupErrMess;
    });
  }
}
