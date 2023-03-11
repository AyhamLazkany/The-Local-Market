import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import 'hammerjs';
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

import { StoreService } from './2.Services/store.service';
import { ProductService } from './2.Services/product.service';
import { FavoriteService } from './2.Services/favorite.service';
import { BayRecService } from './2.Services/bay-rec.service';
import { SaleRecService } from './2.Services/sale-rec.service';
import { ProcessHttpMsgService } from './2.Services/process-http-msg.service';
import { AuthService } from './2.Services/auth.service';
import { AuthInterceptor, UnauthorizedInterceptor } from './2.Services/auth.interceptor';
import { AuthGuardService } from './2.Services/auth-guard.service';

import { baseURL } from './1.Shared/baseurl';
import { ProfileComponent } from './profile/profile.component';

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
    StoreComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    ProcessHttpMsgService,
    StoreService,
    ProductService,
    FavoriteService,
    BayRecService,
    SaleRecService,
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    { provide: 'BaseURL', useValue: baseURL }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
