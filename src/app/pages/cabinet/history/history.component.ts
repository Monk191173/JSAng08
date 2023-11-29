import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CabinetComponent } from '../cabinet.component';
import { IProductResponse } from 'src/app/shared/interfaces/products';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  public history: Array<IProductResponse> = [];
constructor(
  private dialogRef:MatDialogRef<CabinetComponent>
){}

historyClick(): void {
  this.dialogRef.close()
}
}
