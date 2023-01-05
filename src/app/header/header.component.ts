import { Component, OnInit } from '@angular/core';
import { AppRoutingModule } from '../3.App-routing/app-routing.module';
import { SFDComponent } from '../sign-form-dialog/sign-form-dialog.component';
import { user } from '../1.Shared/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{

  constructor() {};

  ngOnInit() {
  }

}
