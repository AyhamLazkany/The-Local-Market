import { Routes } from "@angular/router";
import { AuthGuardService as AuthGuard } from "../2.Services/auth-guard.service";

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { MarketComponent } from "../market/market.component";
import { ServiceComponent } from "../service/service.component";
import { StoreComponent } from "../store/store.component";
import { ProfileComponent } from "../profile/profile.component"; 
/* import { FavoritesComponent } from "../favorite/favorite.component";
import { BayRecsComponent } from "../bayRec/bayRec.component/";
import { SaleRecsComponent } from "../saleRec/bayRec.component/"; */

export const routes: Routes = [
   { path: 'home', component: HomeComponent },
   { path: 'about', component: AboutComponent },
   { path: 'contact', component: ContactComponent },
   { path: 'market', component: MarketComponent, canActivate: [AuthGuard] },
   { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
   { path: 'store/:id', component: StoreComponent, canActivate: [AuthGuard] },
/*    { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
   { path: 'bayRecs', component: BayRecsComponent, canActivate: [AuthGuard] },
   { path: 'saleRecs', component: SaleRecsComponent, canActivate: [AuthGuard] }, */
   { path: 'services', component: ServiceComponent },
   { path: '', redirectTo: 'home', pathMatch: 'full' }
];