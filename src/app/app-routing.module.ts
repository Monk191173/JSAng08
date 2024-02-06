import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './shared/guards/login.guard';


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
    path: 'checkout',
    loadChildren: () => import('./pages/checkout/checkout.module').then(ch => ch.CheckoutModule)
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


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
