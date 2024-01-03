import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from './shared/shared-module';
import { NgOptimizedImage } from "@angular/common";
import { CallbackComponent } from './pages/callback/callback.component';


// import { ActionsComponent } from './pages/actions/actions.component';
//import { HomeComponent } from './pages/home/home.component';
// import { AboutUsComponent } from './pages/about-us/about-us.component';
// import { DostavkaTaOplataComponent } from './pages/dostavka-ta-oplata/dostavka-ta-oplata.component';
// import { NapoyiComponent } from './products/napoyi/napoyi.component';
// import { RoliComponent } from './products/roli/roli.component';
// import { SetuComponent } from './products/setu/setu.component';
// import { SousiComponent } from './products/sousi/sousi.component';
// import { AdminComponent } from './admin/admin.component';
// import { AdminActionsComponent } from './admin/admin-actions/admin-actions.component';
// import { AdminProductsComponent } from './admin/admin-products/admin-products/admin-products.component';
// import { ActionInfoComponent } from './pages/actions/action-info/action-info.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { ShowProductComponent } from './products/show-product/show-product.component';
import { InfoProductComponent } from './products/info-product/info-product.component';
// import { LoginComponent } from './pages/login/login.component';
// import { CabinetComponent } from './pages/cabinet/cabinet.component';
// import { PersonalComponent } from './pages/cabinet/personal/personal.component';
// import { HistoryComponent } from './pages/cabinet/history/history.component';
// import { PasswordComponent } from './pages/cabinet/password/password.component';
// import { LoginUserComponent } from './pages/login-user/login-user.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CheckoutComponent,
    CallbackComponent,
    // ShowProductComponent,
    InfoProductComponent,
    // ActionsComponent,
    // HomeComponent,
    // AboutUsComponent,
    // DostavkaTaOplataComponent,
    // NapoyiComponent,
    // RoliComponent,
    // SetuComponent,
    // SousiComponent,

    // AdminComponent,
    // AdminActionsComponent,
    // AdminProductsComponent,
    // ActionInfoComponent,
    // FilterPipe
    // LoginComponent,
    // CabinetComponent,
    // PersonalComponent,
    // HistoryComponent,
    // PasswordComponent,
    // LoginUserComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule, HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    SharedModule,
    NgOptimizedImage
    
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
