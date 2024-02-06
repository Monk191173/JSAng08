import { Component } from '@angular/core';
import { IProductResponse } from '../shared/interfaces/products';
import { ProductsService } from '../shared/services/products/products.service';
import { UsersService } from '../shared/services/users/users.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginUserComponent } from '../pages/login-user/login-user.component';
import { Router } from '@angular/router';
import { CheckoutComponent } from '../pages/checkout/checkout.component';
import { CallbackComponent } from '../pages/callback/callback.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public total = 0;
  public total_count = 0;
  public basket: Array<IProductResponse> = [];
  public urlAdm = '../../assets/images/user.svg';
  public roleRoute = 'login';
  constructor(
    public prodService: ProductsService,
    public userService: UsersService,
    public dialog: MatDialog,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();

    if (localStorage.length > 0 && localStorage.getItem('curUser')) {
      this.urlAdm = '../../assets/images/user_out.svg';
      this.roleRoute = (JSON.parse(localStorage.getItem('curUser') as string).role == 'ADMIN') ? 'admin' : 'cabinet';
    }
    this.userService.userLogon.subscribe((data) => {
      if (data) { this.urlAdm = '../../assets/images/user_out.svg'; this.roleRoute = (JSON.parse(localStorage.getItem('curUser') as string).role == 'ADMIN') ? 'admin' : 'cabinet' }
      else {
        this.urlAdm = '../../assets/images/user.svg'; localStorage.clear();
        this.roleRoute = 'login'

      }
    })
  }

  loginUser() {
    if (this.roleRoute == 'login') {
      this.dialog.open(LoginUserComponent, {
        backdropClass: 'dialog-back',
        panelClass: 'auth-dialog'
      });
    }
    else { this.router.navigate([this.roleRoute]) }
  }

  callback() {
    this.dialog.open(CallbackComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog'
    });
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getTotalCount();
  }

  getTotalPrice(): void {
    this.total = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count * prod.price, 0);
  }

  getTotalCount(): void {
    this.total_count = this.basket
      .reduce((total: number, prod: IProductResponse) => total + prod.count, 0);
  }

  updateBasket(): void {
    this.prodService.changeBasket.subscribe(() => {
      this.basket = [];
      this.loadBasket();
    })
  }

  basketClick(): void {
    this.dialog.open(CheckoutComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'check-out',
      autoFocus: false
    });
  }


}
