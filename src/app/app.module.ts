import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MarketComponent } from './market/market.component';
import { ServiceComponent } from './service/service.component';
import { SFDComponent } from './sign-form-dialog/sign-form-dialog.component';
import { StoreComponent } from './store/store.component';

import { AppRoutingModule } from './3.App-routing/app-routing.module';

import { UserService } from './2.Services/user.service';
import { StoreService } from './2.Services/store.service';
import { ProductService } from './2.Services/product.service';
import { FavoriteService } from './2.Services/favorite.service';
import { BayRecService } from './2.Services/bay-rec.service';
import { SaleRecService } from './2.Services/sale-rec.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    HeaderComponent,
    FooterComponent,
    MarketComponent,
    ServiceComponent,
    SFDComponent,
    StoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule
  ],
  providers: [
    UserService,
    StoreService,
    ProductService,
    FavoriteService,
    BayRecService,
    SaleRecService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
