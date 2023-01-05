import { Component } from '@angular/core';
import { SFDComponent } from '../sign-form-dialog/sign-form-dialog.component'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  Logged : boolean = true;
}
