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
import { actionResolver } from './shared/resolvers/action.resolver';
import { productInfoResolver } from './shared/resolvers/product-info.resolver';
import { InfoProductComponent } from './products/info-product/info-product.component';
import { LoginComponent } from './pages/login/login.component';
import { loginGuard } from './shared/guards/login.guard';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { PersonalComponent } from './pages/cabinet/personal/personal.component';
import { HistoryComponent } from './pages/cabinet/history/history.component';
import { PasswordComponent } from './pages/cabinet/password/password.component';
import { usersResolver } from './shared/resolvers/users.resolver';

const routes: Routes = [  
{path:'',component:HomeComponent},
{path:'home',component:HomeComponent,resolve:{
product:productInfoResolver
}},
{path:'actions',component:ActionsComponent,resolve:{
  action:actionResolver
}},
{path:'action/:id', component: ActionInfoComponent },
{path:'admin',component:AdminComponent,canActivate:[loginGuard],children:[
  {path:'admin-actions',component:AdminActionsComponent},
  {path:'admin-products',component:AdminProductsComponent}
]},
{path:'login',component:LoginComponent},
{path:'checkout',component:CheckoutComponent},
{path:'products/roli',component:RoliComponent},
{path:'products/setu',component:SetuComponent},
{path:'products/napoyi',component:NapoyiComponent},
{path:'products/sousi',component:SousiComponent},
{path:'product/:id',component:InfoProductComponent,resolve:{
  product:productInfoResolver  
}},
{path:'cabinet',canActivate:[loginGuard],component:CabinetComponent,
children:[
  {path:'personal',component:PersonalComponent,resolve:{
    users:usersResolver
  }},
  {path:'history',component:HistoryComponent},
  {path:'password',component:PasswordComponent}
]},
{path:'dostavka-ta-oplata',component:DostavkaTaOplataComponent},
{path:'about-us',component:AboutUsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
