import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ActionsComponent } from './pages/actions/actions.component';
import { AdminComponent } from './admin/admin.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { RoliComponent } from './products/roli/roli.component';
import { SetuComponent } from './products/setu/setu.component';
import { NapoyiComponent } from './products/napoyi/napoyi.component';
import { SousiComponent } from './products/sousi/sousi.component';
import { DostavkaTaOplataComponent } from './pages/dostavka-ta-oplata/dostavka-ta-oplata.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AdminActionsComponent } from './admin/admin-actions/admin-actions.component';
import { ActionInfoComponent } from './pages/actions/action-info/action-info.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products/admin-products.component';

const routes: Routes = [  
{path:'',component:HomeComponent},
{path:'home',component:HomeComponent},
{path:'actions',component:ActionsComponent},
{path:'action/:id', component: ActionInfoComponent },
{path:'admin',component:AdminComponent,children:[
  {path:'admin-actions',component:AdminActionsComponent},
  {path:'admin-products',component:AdminProductsComponent}
]},
{path:'checkout',component:CheckoutComponent},
{path:'products/roli',component:RoliComponent},
{path:'products/setu',component:SetuComponent},
{path:'products/napoyi',component:NapoyiComponent},
{path:'products/sousi',component:SousiComponent},
{path:'dostavka-ta-oplata',component:DostavkaTaOplataComponent},
{path:'about-us',component:AboutUsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
