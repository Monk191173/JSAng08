import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/shared/services/products/products.service';
import { UsersService } from 'src/app/shared/services/users/users.service';
import { HistoryComponent } from './history/history.component';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent {

  constructor(
    private prodService: ProductsService,
    private userService: UsersService,
    public dialog: MatDialog,
    private router: Router
  ){}

  goHome(){
    localStorage.clear();
    this.userService.userLogon.next(false);
    this.prodService.changeBasket.next(true);
    this.router.navigate(['']);
  }

  openHistory(){
    this.dialog.open(HistoryComponent, {
      backdropClass: 'dialog-back',
      panelClass:'check-out',
      autoFocus: false
    });
  }
}
