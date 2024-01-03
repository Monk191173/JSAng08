import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from 'src/app/header/header.component';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss']
})
export class CallbackComponent {
  public callForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<HeaderComponent>
  ) {
  }
  ngOnInit(){
    this.initUsersForm();
  }
  initUsersForm(): void {

    this.callForm = this.fb.group({
      name: [null],
      phone:[null]
    })
  }
  signIn(): void {
  this.dialogRef.close();
  }
  
}
