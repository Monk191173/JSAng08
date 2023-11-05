import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { ActionsComponent } from './pages/actions/actions.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { DostavkaTaOplataComponent } from './pages/dostavka-ta-oplata/dostavka-ta-oplata.component';
import { NapoyiComponent } from './products/napoyi/napoyi.component';
import { RoliComponent } from './products/roli/roli.component';
import { SetuComponent } from './products/setu/setu.component';
import { SousiComponent } from './products/sousi/sousi.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { AdminActionsComponent } from './admin/admin-actions/admin-actions.component';
import { ActionInfoComponent } from './pages/actions/action-info/action-info.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products/admin-products.component';
import { FilterPipe } from './shared/pipes/filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ActionsComponent,
    CheckoutComponent,
    HomeComponent,
    AboutUsComponent,
    DostavkaTaOplataComponent,
    NapoyiComponent,
    RoliComponent,
    SetuComponent,
    SousiComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    AdminActionsComponent,
    ActionInfoComponent,
    AdminProductsComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
