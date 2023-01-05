import { Routes } from "@angular/router";

import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { MarketComponent } from "../market/market.component";
import { StoreComponent } from "../store/store.component";
import { ServiceComponent } from "../service/service.component";

export const routes: Routes = [
   {path:'home', component: HomeComponent},
   {path:'about', component: AboutComponent},
   {path:'contact', component: ContactComponent},
   {path:'market', component: MarketComponent},
   {path:'store/:id', component: StoreComponent},
   {path:'services', component: ServiceComponent},
   {path:'', redirectTo:'home', pathMatch:'full'}
];