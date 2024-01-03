import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './shared/guards/login.guard';
// import { HomeComponent } from './pages/home/home.component';
// import { ActionsComponent } from './pages/actions/actions.component';
// import { AdminComponent } from './admin/admin.component';
// import { CheckoutComponent } from './pages/checkout/checkout.component';
// import { RoliComponent } from './products/roli/roli.component';
// import { SetuComponent } from './products/setu/setu.component';
// import { NapoyiComponent } from './products/napoyi/napoyi.component';
// import { SousiComponent } from './products/sousi/sousi.component';
// import { DostavkaTaOplataComponent } from './pages/dostavka-ta-oplata/dostavka-ta-oplata.component';
// import { AboutUsComponent } from './pages/about-us/about-us.component';
// import { AdminActionsComponent } from './admin/admin-actions/admin-actions.component';
// import { ActionInfoComponent } from './pages/actions/action-info/action-info.component';
// import { AdminProductsComponent } from './admin/admin-products/admin-products/admin-products.component';
// import { actionResolver } from './shared/resolvers/action.resolver';
// import { productInfoResolver } from './shared/resolvers/product-info.resolver';
// import { InfoProductComponent } from './products/info-product/info-product.component';
// import { LoginComponent } from './pages/login/login.component';
// import { CabinetComponent } from './pages/cabinet/cabinet.component';
// import { PersonalComponent } from './pages/cabinet/personal/personal.component';
// import { HistoryComponent } from './pages/cabinet/history/history.component';
// import { PasswordComponent } from './pages/cabinet/password/password.component';
// import { usersResolver } from './shared/resolvers/users.resolver';
// import { LoginUserComponent } from './pages/login-user/login-user.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(h => h.HomeModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(h => h.HomeModule)
  },
  {
    path: 'actions',
    loadChildren: () => import('./pages/actions/actions.module').then(ac => ac.ActionsModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [loginGuard]
  },
  {
    path: 'products/roli',
    loadChildren: () => import('./products/roli/roli.module').then(r => r.RoliModule)
  },
  {
    path: 'products/setu',
    loadChildren: () => import('./products/setu/setu.module').then(s => s.SetuModule)
  },
  {
    path: 'products/napoyi',
    loadChildren: () => import('./products/napoyi/napoyi.module').then(n => n.NapoyiModule)
  },
  {
    path: 'products/sousi',
    loadChildren: () => import('./products/sousi/sousi.module').then(s => s.SousiModule)
  },
  {
    path: 'cabinet',
    loadChildren: () => import('./pages/cabinet/cabinet.module').then(c => c.CabinetModule),
    canActivate: [loginGuard]
  },
  {
    path: 'dostavka-ta-oplata',
    loadChildren: () => import('./pages/dostavka-ta-oplata/dostavka-ta-oplata.module').then(d => d.DostavkaTaOplataModule)
  },
  {
    path: 'about-us',
    loadChildren: () => import('./pages/about-us/about-us.module').then(a => a.AboutUsModule)
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./products/info-product/info-product.module').then(i => i.InfoModule)
  },
  {
    path: 'loginadmin',
    loadChildren: () => import('./pages/login/login.module').then(l => l.LoginModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login-user/login-user.module').then(u => u.LoginUserModule)
  }
  // {path:'',component:HomeComponent},
  // {path:'home',component:HomeComponent,resolve:{
  // product:productInfoResolver
  // }},

  // {path:'action/:id', component: ActionInfoComponent },
  // {path:'admin',component:AdminComponent,canActivate:[loginGuard],children:[
  //   {path:'admin-actions',component:AdminActionsComponent},
  //   {path:'admin-products',component:AdminProductsComponent}
  // ]},



  // {path:'checkout',component:CheckoutComponent},

  // {path:'products/sousi',component:SousiComponent},


  // {path:'cabinet',canActivate:[loginGuard],component:CabinetComponent,
  // children:[
  //   {path:'personal',component:PersonalComponent,resolve:{
  //     users:usersResolver
  //   }},
  //   {path:'history',component:HistoryComponent},
  //   {path:'password',component:PasswordComponent}
  // ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
